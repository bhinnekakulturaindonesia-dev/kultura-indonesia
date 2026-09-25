import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Submit a new comment
export async function POST(request) {
  try {
    const body = await request.json();
    const { contentType, contentSlug, authorName, authorEmail, commentText } = body;

    // Validation
    if (!contentType || !contentSlug || !authorName || !authorEmail || !commentText) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    if (!authorEmail.includes('@')) {
      return NextResponse.json(
        { error: 'Email tidak valid' },
        { status: 400 }
      );
    }

    if (commentText.length < 3) {
      return NextResponse.json(
        { error: 'Komentar minimal 3 karakter' },
        { status: 400 }
      );
    }

    if (commentText.length > 1000) {
      return NextResponse.json(
        { error: 'Komentar maksimal 1000 karakter' },
        { status: 400 }
      );
    }

    // Get request metadata
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown';

    // Basic spam detection (very simple)
    const spamKeywords = ['viagra', 'casino', 'lottery', 'prize', 'click here', 'buy now'];
    const isSpam = spamKeywords.some(keyword => 
      commentText.toLowerCase().includes(keyword) ||
      authorName.toLowerCase().includes(keyword)
    );

    // Insert comment
    const { error } = await supabase
      .from('comments')
      .insert([{
        content_type: contentType,
        content_slug: contentSlug,
        author_name: authorName.trim(),
        author_email: authorEmail.toLowerCase().trim(),
        comment_text: commentText.trim(),
        status: isSpam ? 'spam' : 'pending',
        ip_address: ip,
        user_agent: userAgent
      }]);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: isSpam 
        ? 'Komentar terdeteksi sebagai spam'
        : 'Komentar berhasil dikirim dan menunggu persetujuan admin'
    });

  } catch (error) {
    console.error('Comment submission error:', error);
    return NextResponse.json(
      { error: 'Gagal mengirim komentar. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}

// Get comments for a specific content
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('type');
    const contentSlug = searchParams.get('slug');
    const status = searchParams.get('status') || 'approved';

    if (!contentType || !contentSlug) {
      return NextResponse.json(
        { error: 'type and slug are required' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('comments')
      .select('*')
      .eq('content_type', contentType)
      .eq('content_slug', contentSlug)
      .order('created_at', { ascending: false });

    // Only filter by status if not 'all'
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({
      comments: data || [],
      total: data?.length || 0
    });

  } catch (error) {
    console.error('Comments fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
