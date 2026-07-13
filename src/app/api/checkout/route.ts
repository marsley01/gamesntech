import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { initiateSTKPush } from '@/lib/mpesa/daraja';

export async function POST(request: NextRequest) {
  try {
    const { productId, buyerPhone, buyerEmail } = await request.json();

    if (!productId || !buyerPhone) {
      return NextResponse.json({ error: 'productId and buyerPhone are required' }, { status: 400 });
    }

    // Validate phone format
    const cleanPhone = buyerPhone.replace(/[^0-9]/g, '');
    if (!cleanPhone.startsWith('254') || cleanPhone.length !== 12) {
      return NextResponse.json(
        { error: 'Phone must be in 2547XXXXXXXX format' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Fetch product with seller info
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*, profiles!inner(mpesa_phone)')
      .eq('id', productId)
      .eq('status', 'active')
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found or not available' }, { status: 404 });
    }

    // Calculate commission and earnings (integer math)
    const gntCommission = Math.floor(product.price * 0.25);
    const sellerEarnings = product.price - gntCommission;

    // Get or create buyer profile if email provided
    let buyerId: string | null = null;
    if (buyerEmail) {
      const { data: existingBuyer } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', buyerEmail)
        .single();

      if (existingBuyer) {
        buyerId = existingBuyer.id;
      }
    }

    // Create order with download_token valid for 48 hours
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        buyer_id: buyerId,
        product_id: productId,
        seller_id: product.seller_id,
        amount_paid: product.price,
        gnt_commission: gntCommission,
        seller_earnings: sellerEarnings,
        mpesa_phone: cleanPhone,
        status: 'pending',
        download_expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('[Checkout] Failed to create order:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    console.log('[Checkout] Order created:', order.id, 'for product', product.title);

    // Initiate M-Pesa STK Push
    try {
      const checkoutRequestId = await initiateSTKPush({
        phone: cleanPhone,
        amount: product.price,
        orderId: order.id,
        productTitle: product.title,
      });

      // Save CheckoutRequestID to order
      await supabase
        .from('orders')
        .update({ mpesa_checkout_request_id: checkoutRequestId })
        .eq('id', order.id);

      console.log('[Checkout] STK Push initiated for order', order.id, 'CheckoutRequestID:', checkoutRequestId);

      return NextResponse.json({
        orderId: order.id,
        checkoutRequestId,
        message: 'Check your phone for M-Pesa prompt',
      });
    } catch (mpesaError) {
      // STK Push failed — mark order as failed
      await supabase
        .from('orders')
        .update({ status: 'failed' })
        .eq('id', order.id);

      console.error('[Checkout] STK Push failed for order', order.id, ':', mpesaError);

      return NextResponse.json(
        { error: 'Failed to initiate M-Pesa payment. Please try again.' },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('[Checkout] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
