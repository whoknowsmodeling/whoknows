export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: campaigns, error } = await supabaseAdmin
      .from("Campaign")
      .select(`
        *,
        images:CampaignImage(*),
        models:CampaignModel(
          model:Model(
            *,
            images:ModelImage(*)
          )
        )
      `)
      .order("order", { ascending: true });

    if (error) throw error;

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}
