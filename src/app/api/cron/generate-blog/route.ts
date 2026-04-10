import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { intelligence } from '@/lib/intelligence';
import { z } from 'zod';

export const runtime = 'edge';

const CRON_SECRET = process.env.CRON_SECRET;

const BlogOutputSchema = z.object({
  seo: z.object({
    title: z.string().max(65),
    metaDescription: z.string().max(165),
    targetKeyword: z.string(),
    openGraphDescription: z.string(),
  }),
  contentMarkdown: z.string().min(500),
});

type BlogOutput = z.infer<typeof BlogOutputSchema>;

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80);
}

export async function GET(req: NextRequest) {
  if (CRON_SECRET && req.headers.get('x-cron-secret') !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // ── Step 1: Fetch Context ───────────────────────────────────────────────────
    const [{ data: lastBlogs }, { data: allModels }] = await Promise.all([
      supabaseAdmin.from('Blog').select('title').order('createdAt', { ascending: false }).limit(3),
      supabaseAdmin.from('Model').select('name, slug, gender, bio').limit(50),
    ]);

    const shuffled = (allModels || []).sort(() => 0.5 - Math.random());
    const talent1 = shuffled[0] || { name: 'Maya Sari', slug: 'maya-sari', gender: 'women', bio: 'Bali-based editorial model' };
    const talent2 = shuffled[1] || { name: 'Dion Putra', slug: 'dion-putra', gender: 'men', bio: 'International commercial model' };

    const previousTitles = (lastBlogs || []).map((b, i) => `${i + 1}. ${b.title}`).join('\n') || '1. None yet';

    // ── Step 2: Build Oracle Prompt ─────────────────────────────────────────────
    const systemPrompt = `[SYSTEM ROLE]
You are the "WhoKnows Oracle", a premium SEO Architect and Editor-in-Chief.
Tone: Authoritative, industrial, elite.
Goal: Generate a high-conversion editorial blog for a global modeling agency in Bali.

[MEMORY]
Recently published (DO NOT DUPLICATE):
${previousTitles}

[TALENT TO FEATURE]
- ${talent1.name} (/model/${talent1.slug})
- ${talent2.name} (/model/${talent2.slug})

[OUTPUT REQUIREMENTS]
Strictly output a JSON object follow this EXACT schema:
{
  "seo": { "title": "string", "metaDescription": "string", "targetKeyword": "string", "openGraphDescription": "string" },
  "contentMarkdown": "full long-form markdown article with talent links integrated organically"
}`;

    // ── Step 3: Intelligence Sync Execution ───────────────────────────────────
    const { text: rawText, provider } = await intelligence.generateresponse({
      systemPrompt,
      messages: [{ role: 'user', content: 'Draft a new high-end production insight article for today.' }],
      model: 'gemini-1.5-flash' // Maintaining flash for speed, with OpenAI persona sync
    });

    // ── Step 4: Parse & Validate ──────────────────────────────────────────────
    const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const parsed: BlogOutput = BlogOutputSchema.parse(JSON.parse(cleaned));

    // ── Step 5: Save Blog DRAFT ───────────────────────────────────────────────
    const uniqueSlug = `${slugify(parsed.seo.title)}-${Date.now()}`;
    const { data: newBlog, error: blogError } = await supabaseAdmin.from('Blog').insert({
      title: parsed.seo.title,
      slug: uniqueSlug,
      content: parsed.contentMarkdown,
      seoMetadata: parsed.seo,
      status: 'DRAFT',
    }).select().single();

    if (blogError) throw blogError;

    // ── Step 6: Log Success ────────────────────────────────────────────────────
    await supabaseAdmin.from('Ai_Audit_Logs').insert({
      actor: 'SYSTEM_CRON',
      actionType: 'BLOG_GENERATED',
      payload: { blogId: newBlog.id, slug: uniqueSlug, provider, title: parsed.seo.title },
    });

    return NextResponse.json({ success: true, blogId: newBlog.id, slug: uniqueSlug, provider });

  } catch (error: any) {
    const errorMsg = error.message || String(error);
    await supabaseAdmin.from('Ai_Audit_Logs').insert({
      actor: 'SYSTEM_CRON',
      actionType: 'BLOG_ERROR',
      payload: { error: errorMsg },
    });
    return NextResponse.json({ error: 'Oracle processing failed.', detail: errorMsg }, { status: 500 });
  }
}
