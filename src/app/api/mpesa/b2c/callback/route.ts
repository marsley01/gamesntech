import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { MpesaB2CCallbackPayload } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const payload: MpesaB2CCallbackPayload = await request.json();
    const { Result } = payload;

    console.log('[B2C Callback] Received ResultCode:', Result.ResultCode, 'TransactionID:', Result.TransactionID);

    const supabase = createAdminClient();

    // Extract transaction ID
    const transactionId = Result.TransactionID || '';

    if (Result.ResultCode === 0) {
      // B2C payment successful
      // Find the payout by matching amount and phone (we'll use the most recent pending one)
      // Since we don't have the payout ID in the callback, find by checking recent processing payouts

      const { data: payouts } = await supabase
        .from('payouts')
        .select('*')
        .in('status', ['pending', 'processing'])
        .order('created_at', { ascending: false })
        .limit(10);

      if (payouts && payouts.length > 0) {
        // Update the most relevant payout
        // In production, you'd pass the payout ID via the Remarks/Occasion field
        const payout = payouts[0];

        const { error: updateError } = await supabase
          .from('payouts')
          .update({
            status: 'completed',
            mpesa_transaction_id: transactionId,
          })
          .eq('id', payout.id);

        if (updateError) {
          console.error('[B2C Callback] Failed to update payout:', updateError);
        } else {
          console.log('[B2C Callback] Payout completed:', payout.id, 'Transaction:', transactionId);
        }
      }
    } else {
      // B2C payment failed — find and update payout, refund balance
      const { data: payouts } = await supabase
        .from('payouts')
        .select('*')
        .in('status', ['pending', 'processing'])
        .order('created_at', { ascending: false })
        .limit(10);

      if (payouts && payouts.length > 0) {
        const payout = payouts[0];

        // Mark payout as failed
        await supabase
          .from('payouts')
          .update({
            status: 'failed',
            mpesa_transaction_id: transactionId,
          })
          .eq('id', payout.id);

        // Refund the balance back to the seller wallet
        const { data: wallet } = await supabase
          .from('wallet_balances')
          .select('*')
          .eq('seller_id', payout.seller_id)
          .single();

        if (wallet) {
          await supabase
            .from('wallet_balances')
            .update({
              available_balance: wallet.available_balance + payout.amount,
              updated_at: new Date().toISOString(),
            })
            .eq('seller_id', payout.seller_id);

          console.log('[B2C Callback] Balance refunded for seller', payout.seller_id, 'amount', payout.amount);
        }
      }

      console.log('[B2C Callback] Payout failed:', Result.ResultDesc);
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' });
  } catch (error) {
    console.error('[B2C Callback] Fatal error:', error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
}
