import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ downloadToken: string }> }
) {
  try {
    const { downloadToken } = await params;

    const supabase = createAdminClient();

    // Find order by download_token
    const { data: order, error } = await supabase
      .from('orders')
      .select('*, products!inner(file_url, title)')
      .eq('download_token', downloadToken)
      .single();

    if (error || !order) {
      console.log('[Download] Invalid token attempted:', downloadToken);
      return NextResponse.json({ error: 'Invalid download token' }, { status: 403 });
    }

    // Check order status
    if (order.status !== 'completed') {
      console.log('[Download] Token for non-completed order:', order.id, 'status:', order.status);
      return NextResponse.json(
        { error: 'Payment not completed. Please complete payment first.' },
        { status: 403 }
      );
    }

    // Check if download has expired (48 hours)
    const expiresAt = new Date(order.download_expires_at);
    if (new Date() > expiresAt) {
      console.log('[Download] Expired token for order:', order.id);
      return NextResponse.json(
        { error: 'Download link has expired. Contact support for assistance.' },
        { status: 403 }
      );
    }

    // Generate signed URL valid for 60 seconds
    const fileUrl = order.products?.file_url;
    if (!fileUrl) {
      console.error('[Download] No file_url for product in order:', order.id);
      return NextResponse.json({ error: 'File not available' }, { status: 500 });
    }

    const { data: signedData, error: signedError } = await supabase.storage
      .from('gnt-products')
      .createSignedUrl(fileUrl, 60);

    if (signedError || !signedData) {
      console.error('[Download] Failed to generate signed URL:', signedError);
      return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
    }

    console.log('[Download] Access granted for order', order.id, 'product:', order.products?.title);

    // Redirect to signed URL
    return NextResponse.redirect(signedData.signedUrl);
  } catch (error) {
    console.error('[Download] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
