/**
 * Blog API — List & Create
 * GET  /api/admin/blog
 * POST /api/admin/blog
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('Blog')
    .select('id, title, slug, status, publishedAt, createdAt, seoMetadata')
    .order('createdAt', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, slug, content, seoMetadata } = body;
  if (!title || !slug || !content) {
    return NextResponse.json({ error: 'title, slug, and content are required.' }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from('Blog')
    .insert({ title, slug, content, seoMetadata: seoMetadata || null, status: 'DRAFT' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
