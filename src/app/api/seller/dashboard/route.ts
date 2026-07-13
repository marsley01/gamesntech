import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { DashboardResponse } from '@/types';

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'seller') {
      return NextResponse.json({ error: 'Seller account required' }, { status: 403 });
    }

    const adminClient = createAdminClient();
    const sellerId = session.user.id;

    // Get wallet balance
    const { data: wallet } = await adminClient
      .from('wallet_balances')
      .select('*')
      .eq('seller_id', sellerId)
      .single();

    // Get all seller products with sales info
    const { data: products } = await adminClient
      .from('products')
      .select('*')
      .eq('seller_id', sellerId)
      .order('total_sales', { ascending: false });

    // Get recent orders (last 10)
    const { data: recentOrders } = await adminClient
      .from('orders')
      .select('*')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false })
      .limit(10);

    // Calculate total sales count
    const totalSalesCount = products?.reduce((sum, p) => sum + (p.total_sales || 0), 0) || 0;

    // Get completed orders count per product
    const { data: completedOrders } = await adminClient
      .from('orders')
      .select('product_id')
      .eq('seller_id', sellerId)
      .eq('status', 'completed');

    const productSaleCounts = new Map<string, number>();
    if (completedOrders) {
      for (const o of completedOrders) {
        productSaleCounts.set(o.product_id, (productSaleCounts.get(o.product_id) || 0) + 1);
      }
    }

    const topProducts = (products || [])
      .map((p) => ({
        ...p,
        sale_count: productSaleCounts.get(p.id) || 0,
      }))
      .sort((a, b) => b.sale_count - a.sale_count)
      .slice(0, 10);

    const response: DashboardResponse = {
      wallet_balance: {
        available: wallet?.available_balance || 0,
        pending: wallet?.pending_balance || 0,
      },
      total_sales: totalSalesCount,
      recent_orders: (recentOrders || []) as DashboardResponse['recent_orders'],
      top_products: topProducts as DashboardResponse['top_products'],
      total_earned: wallet?.total_earned || 0,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Dashboard] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
