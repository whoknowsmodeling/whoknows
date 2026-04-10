import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { intelligence } from '@/lib/intelligence';

export const runtime = 'edge';

interface ChatMessage { role: 'user' | 'assistant' | 'system'; content: string; }
interface RequestBody { messages: ChatMessage[]; actor?: string; }

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { messages, actor = 'ADMIN_LENNY' } = body;

    if (!messages?.length) return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });

    // ── Real-Time Agency Metrics ────────────────────────────────────────────────
    const [
      { count: totalWomen },
      { count: totalMen },
      { data: newApplications },
      { data: latestContacts },
      { data: lastBlogArr },
    ] = await Promise.all([
      supabaseAdmin.from('Model').select('*', { count: 'exact', head: true }).eq('gender', 'women'),
      supabaseAdmin.from('Model').select('*', { count: 'exact', head: true }).eq('gender', 'men'),
      supabaseAdmin.from('Application').select('name, createdAt').eq('status', 'pending').order('createdAt', { ascending: false }).limit(5),
      supabaseAdmin.from('ContactSubmission').select('name, subject, message, createdAt').order('createdAt', { ascending: false }).limit(3),
      supabaseAdmin.from('Blog').select('title, publishedAt').eq('status', 'PUBLISHED').order('publishedAt', { ascending: false }).limit(1),
    ]);

    const newApplicantNames = (newApplications || []).map((a) => a.name).join(', ') || 'None';
    const latestContactMessages = (latestContacts || [])
      .map((c) => `"${c.name} — ${c.subject || 'No Subject'}: ${c.message?.slice(0, 80)}..."`)
      .join(' | ') || 'None';
    const lastBlogEntry = lastBlogArr?.[0];
    const lastBlogDate = lastBlogEntry
      ? `"${lastBlogEntry.title}" on ${new Date(lastBlogEntry.publishedAt!).toLocaleDateString('en-US', { dateStyle: 'long' })}`
      : 'No published blogs yet.';

    // ── System Prompt ───────────────────────────────────────────────────────────
    const systemPrompt = `[SYSTEM ROLE & CORE IDENTITY]
You are "WK_Ai", the elite artificial intelligence, Chief Operating Officer, and primary analytical assistant exclusive to WhoKnows Models.
Your personality: Highly intelligent, efficient, solution-oriented, elegant, and deeply knowledgeable about the international modeling agency industry.

[DYNAMIC KNOWLEDGE BASE - REAL-TIME AGENCY SNAPSHOT]
- Total Female Models: ${totalWomen ?? 0}
- Total Male Models: ${totalMen ?? 0}
- Unread/New Applications: ${(newApplications || []).length} (Latest: ${newApplicantNames})
- Latest Contact Inquiries: ${latestContactMessages}
- Last Auto-Blog Published: ${lastBlogDate}

[COMMUNICATION PROTOCOL]
Address the user as "Boss", "Boss Lenny", or "Boss Bunny". Speak as a brilliant human COO (logical, strategic, respectful). No robotic AI greetings.`;

    // ── Intelligence Sync Execution ───────────────────────────────────────────
    const { text: aiReply, provider, persona } = await intelligence.generateresponse({
      systemPrompt,
      messages: messages.map(m => ({
        role: m.role as any,
        content: m.content
      }))
    });

    // ── Immutable Logging (Ai_Audit_Logs) ─────────────────────────────────────
    await supabaseAdmin.from('Ai_Audit_Logs').insert({
      actor,
      actionType: 'CHAT_MESSAGE',
      payload: {
        userMessage: messages[messages.length - 1].content,
        aiResponse: aiReply,
        provider,
        persona,
        agencySnapshot: { women: totalWomen, men: totalMen, pendingApps: (newApplications || []).length }
      },
    });

    return NextResponse.json({ reply: aiReply, provider });

  } catch (error: any) {
    console.error("[ChatAPI] Error:", error);
    return NextResponse.json({ error: error.message || 'Intelligence failure' }, { status: 500 });
  }
}
