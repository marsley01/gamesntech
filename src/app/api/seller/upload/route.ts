import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createServerSupabase } from '@/lib/supabase/server';

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'application/x-msdownload',
  'application/vnd.microsoft.portable-executable',
  'audio/mpeg',
  'audio/mp3',
  'video/mp4',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/x-rar-compressed',
  'application/x-7z-compressed',
  'image/jpeg',
  'image/png',
  'image/webp',
];

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

export async function POST(request: NextRequest) {
  try {
    // Authenticate seller
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

    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string | null;
    const description = formData.get('description') as string | null;
    const category = formData.get('category') as string | null;
    const price = formData.get('price') as string | null;
    const coverImage = formData.get('cover_image') as File | null;

    // Validate required fields
    if (!file || !title || !category || !price) {
      return NextResponse.json(
        { error: 'file, title, category, and price are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `File type '${file.type}' is not supported` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 500MB limit' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['software', 'templates', 'ebooks', 'game_keys', 'courses', 'music', 'other'];
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    // Validate price
    const priceNum = parseInt(price, 10);
    if (isNaN(priceNum) || priceNum < 0) {
      return NextResponse.json({ error: 'Price must be a non-negative integer' }, { status: 400 });
    }

    const adminClient = createAdminClient();

    // Generate product ID first
    const { data: newProduct } = await adminClient
      .from('products')
      .insert({
        seller_id: session.user.id,
        title,
        description: description || '',
        category,
        price: priceNum,
        file_url: '', // Will update after upload
        status: 'draft',
      })
      .select()
      .single();

    if (!newProduct) {
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }

    const productId = newProduct.id;
    const fileExt = file.name.split('.').pop() || 'bin';
    const filePath = `sellers/${session.user.id}/${productId}/file.${fileExt}`;

    // Upload file to Supabase Storage
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await adminClient.storage
      .from('gnt-products')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('[Upload] Storage upload failed:', uploadError);
      // Clean up the product record
      await adminClient.from('products').delete().eq('id', productId);
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }

    // Upload cover image if provided
    let coverImageUrl: string | null = null;
    if (coverImage) {
      const coverExt = coverImage.name.split('.').pop() || 'jpg';
      const coverPath = `sellers/${session.user.id}/${productId}/cover.${coverExt}`;
      const coverBuffer = Buffer.from(await coverImage.arrayBuffer());

      const { error: coverError } = await adminClient.storage
        .from('gnt-products')
        .upload(coverPath, coverBuffer, {
          contentType: coverImage.type,
          upsert: false,
        });

      if (!coverError) {
        coverImageUrl = coverPath;
      }
    }

    // Update product record with file URL
    const { error: updateError } = await adminClient
      .from('products')
      .update({
        file_url: filePath,
        cover_image_url: coverImageUrl,
        status: 'active',
      })
      .eq('id', productId);

    if (updateError) {
      console.error('[Upload] Failed to update product record:', updateError);
    }

    console.log('[Upload] Product created:', productId, 'by seller:', session.user.id);

    return NextResponse.json({
      productId,
      status: 'active' as const,
    });
  } catch (error) {
    console.error('[Upload] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
