import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { OrderStatusResponse } from '@/types';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    const supabase = createAdminClient();

    const { data: order, error } = await supabase
      .from('orders')
      .select('status, mpesa_transaction_code')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const response: OrderStatusResponse = {
      status: order.status,
      mpesa_transaction_code: order.mpesa_transaction_code,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Order Status] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
