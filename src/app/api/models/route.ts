export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gender = searchParams.get('gender');

    let query = supabaseAdmin
      .from("Model")
      .select(`*, images:ModelImage(*)`)
      .order("order", { ascending: true });

    if (gender) {
      query = query.eq("gender", gender);
    }

    const { data: models, error } = await query;

    if (error) throw error;

    return NextResponse.json(models, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}
