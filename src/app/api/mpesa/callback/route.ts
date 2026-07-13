import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { MpesaCallbackPayload } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const payload: MpesaCallbackPayload = await request.json();
    const stkCallback = payload.Body.stkCallback;

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    console.log('[M-Pesa Callback] Received for CheckoutRequestID:', CheckoutRequestID, 'ResultCode:', ResultCode);

    const supabase = createAdminClient();

    // Find the order by CheckoutRequestID
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('mpesa_checkout_request_id', CheckoutRequestID)
      .single();

    if (orderError || !order) {
      console.error('[M-Pesa Callback] Order not found for CheckoutRequestID:', CheckoutRequestID);
      // Still return 200 to Safaricom
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
    }

    if (ResultCode === 0) {
      // Payment successful — extract M-Pesa receipt number
      let mpesaReceipt = '';
      if (CallbackMetadata?.Item) {
        for (const item of CallbackMetadata.Item) {
          if (item.Name === 'MpesaReceiptNumber') {
            mpesaReceipt = String(item.Value || '');
            break;
          }
        }
      }

      console.log('[M-Pesa Callback] Payment successful for order', order.id, 'Receipt:', mpesaReceipt);

      // Update order to completed
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'completed',
          mpesa_transaction_code: mpesaReceipt,
        })
        .eq('id', order.id);

      if (updateError) {
        console.error('[M-Pesa Callback] Failed to update order:', updateError);
      }

      // Credit seller wallet
      const { data: wallet } = await supabase
        .from('wallet_balances')
        .select('*')
        .eq('seller_id', order.seller_id)
        .single();

      if (wallet) {
        const { error: walletError } = await supabase
          .from('wallet_balances')
          .update({
            available_balance: wallet.available_balance + order.seller_earnings,
            total_earned: wallet.total_earned + order.seller_earnings,
            updated_at: new Date().toISOString(),
          })
          .eq('seller_id', order.seller_id);

        if (walletError) {
          console.error('[M-Pesa Callback] Failed to update wallet:', walletError);
        } else {
          console.log('[M-Pesa Callback] Wallet credited for seller', order.seller_id, 'amount', order.seller_earnings);
        }
      }

      // Increment product total_sales
      const { error: productError } = await supabase.rpc('increment_product_sales', {
        product_id: order.product_id,
      });

      if (productError) {
        // Fallback: direct update
        await supabase
          .from('products')
          .update({ total_sales: order.amount_paid + 1 })
          .eq('id', order.product_id)
          .throwOnError();
      }

      console.log('[M-Pesa Callback] Order', order.id, 'completed successfully');
    } else {
      // Payment failed
      console.log('[M-Pesa Callback] Payment failed for order', order.id, 'Reason:', ResultDesc);

      await supabase
        .from('orders')
        .update({ status: 'failed' })
        .eq('id', order.id);
    }

    // Always return 200 to Safaricom
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' });
  } catch (error) {
    console.error('[M-Pesa Callback] Fatal error:', error);
    // Must return 200 — Safaricom retries aggressively on non-200
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
}
