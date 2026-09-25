import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { pageUrl, pageType, pageSlug } = body;

    if (!pageUrl || !pageType) {
      return NextResponse.json(
        { error: 'pageUrl and pageType are required' },
        { status: 400 }
      );
    }

    // Get request metadata
    const referrer = request.headers.get('referer') || '';
    const userAgent = request.headers.get('user-agent') || '';
    
    // Note: In production, you might want to get real IP from headers like x-forwarded-for
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown';

    // Insert page view record
    const { error } = await supabase
      .from('page_views')
      .insert([{
        page_url: pageUrl,
        page_type: pageType,
        page_slug: pageSlug || null,
        referrer: referrer,
        user_agent: userAgent,
        ip_address: ip,
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to record page view' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch stats for a specific page
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const type = searchParams.get('type');

    if (!slug || !type) {
      return NextResponse.json(
        { error: 'slug and type are required' },
        { status: 400 }
      );
    }

    // Get total views for this page
    const { data, error } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .eq('page_slug', slug)
      .eq('page_type', type);

    if (error) throw error;

    // Get views from page_stats view
    const { data: stats } = await supabase
      .from('page_stats')
      .select('*')
      .eq('page_slug', slug)
      .eq('page_type', type)
      .single();

    return NextResponse.json({
      slug,
      type,
      totalViews: data?.length || 0,
      stats: stats || null
    });

  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
