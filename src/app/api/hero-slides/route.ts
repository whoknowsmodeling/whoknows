export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
    try {
        const { data: slides, error } = await supabaseAdmin
            .from("HeroSlide")
            .select("*")
            .eq("active", true)
            .order("order", { ascending: true });

        if (error) throw error;

        return NextResponse.json(slides);
    } catch (error) {
        console.error('Error fetching hero slides:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hero slides' },
            { status: 500 }
        );
    }
}
