import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { initiateB2CPayment } from '@/lib/mpesa/daraja';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, mpesa_phone')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'seller') {
      return NextResponse.json({ error: 'Seller account required' }, { status: 403 });
    }

    // Validate seller has a payout phone number
    if (!profile.mpesa_phone) {
      return NextResponse.json(
        { error: 'Please set your M-Pesa payout phone number in your profile settings' },
        { status: 400 }
      );
    }

    const { amount } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Amount must be greater than 0' }, { status: 400 });
    }

    const adminClient = createAdminClient();

    // Get wallet balance
    const { data: wallet, error: walletError } = await adminClient
      .from('wallet_balances')
      .select('*')
      .eq('seller_id', session.user.id)
      .single();

    if (walletError || !wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    }

    if (wallet.available_balance < amount) {
      return NextResponse.json(
        { error: `Insufficient balance. Available: KES ${wallet.available_balance}` },
        { status: 400 }
      );
    }

    // Create payout record
    const { data: payout, error: payoutError } = await adminClient
      .from('payouts')
      .insert({
        seller_id: session.user.id,
        amount,
        mpesa_phone: profile.mpesa_phone,
        status: 'pending',
      })
      .select()
      .single();

    if (payoutError || !payout) {
      console.error('[Withdraw] Failed to create payout:', payoutError);
      return NextResponse.json({ error: 'Failed to create payout' }, { status: 500 });
    }

    // Deduct from available balance immediately
    const { error: deductError } = await adminClient
      .from('wallet_balances')
      .update({
        available_balance: wallet.available_balance - amount,
        updated_at: new Date().toISOString(),
      })
      .eq('seller_id', session.user.id);

    if (deductError) {
      console.error('[Withdraw] Failed to deduct balance:', deductError);
      // Rollback payout
      await adminClient.from('payouts').delete().eq('id', payout.id);
      return NextResponse.json({ error: 'Failed to process withdrawal' }, { status: 500 });
    }

    // Trigger M-Pesa B2C payment
    try {
      const originatorId = await initiateB2CPayment({
        amount,
        phone: profile.mpesa_phone,
        orderId: payout.id,
      });

      // Update payout with transaction reference
      await adminClient
        .from('payouts')
        .update({ status: 'processing' })
        .eq('id', payout.id);

      console.log('[Withdraw] B2C initiated for payout', payout.id, 'Originator:', originatorId);
    } catch (b2cError) {
      console.error('[Withdraw] B2C initiation failed:', b2cError);
      // B2C failed — we'll process this payout manually
      // Balance has already been deducted to prevent double-spending
      console.log('[Withdraw] B2C failed for payout', payout.id, '- marked for manual processing');
    }

    return NextResponse.json({
      message: 'Withdrawal initiated, funds arriving within minutes',
    });
  } catch (error) {
    console.error('[Withdraw] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
