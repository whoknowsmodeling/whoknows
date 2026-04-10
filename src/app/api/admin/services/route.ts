import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'edge';

/**
 * Fetch all Cluster Pages for the admin dashboard management table.
 */
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('ClusterPages')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error("[ServicesAPI] Database Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("[ServicesAPI] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
