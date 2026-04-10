/**
 * AI Audit Logs API — Read-only
 * GET /api/admin/ai-logs
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get('take') || '50'), 100);
  const offset = parseInt(searchParams.get('skip') || '0');

  const { data: logs, error, count } = await supabaseAdmin
    .from('AiAuditLog')
    .select('*', { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ logs: logs || [], total: count ?? 0, take: limit, skip: offset });
}
