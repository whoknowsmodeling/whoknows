export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
    try {
        const { data: clients, error } = await supabaseAdmin
            .from("Client")
            .select("*")
            .eq("active", true)
            .order("order", { ascending: true });

        if (error) throw error;

        return NextResponse.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json(
            { error: 'Failed to fetch clients' },
            { status: 500 }
        );
    }
}
