import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { intelligence } from "@/lib/intelligence";
import { z } from "zod";

export const runtime = "edge";

const ClusterPageSchema = z.object({
  seo: z.object({
    title: z.string(),
    metaDescription: z.string(),
    targetKeyword: z.string(),
    openGraphDescription: z.string(),
  }),
  clusterCategory: z.string(),
  contentMarkdown: z.string(),
});

const CLUSTERS = [
  {
    name: "Commercial Excellence",
    slug: "commercial-production",
    niches: [
      "TVC & Video Casting",
      "Catalogue & Lookbook Fashion",
      "Swimwear & Beachwear Editorial",
      "Fitness & Activewear Modeling",
      "Industrial Tech Branding Shoots"
    ]
  },
  {
    name: "High-Fashion Authority",
    slug: "high-fashion",
    niches: [
      "Luxury Resort Editorial",
      "Avant-Garde Fashion Photography",
      "International Runway Standards",
      "Global Luxury Brand Representation",
      "High-End Portfolio Development"
    ]
  },
  {
    name: "Logistic Intelligence",
    slug: "logistics",
    niches: [
      "Bali Model Kitas & Visa Support",
      "Strategic Casting Call Management",
      "Location Scouting for Fashion",
      "International Crew Coordination",
      "Model Agency Logistic Excellence"
    ]
  },
  {
    name: "Industry Education",
    slug: "education",
    niches: [
      "Professional Posing & Walking Technique",
      "Fashion Business Academy",
      "Starter Modeling Portfolio Strategy",
      "Social Media Influence for Models",
      "Bali Modeling Career Roadmap"
    ]
  }
];

export async function POST(req: NextRequest) {
  try {
    const { clusterIndex = 0 } = await req.json();
    const cluster = CLUSTERS[clusterIndex];
    if (!cluster) return NextResponse.json({ error: "Invalid cluster index" }, { status: 400 });

    const results: Array<{ niche: string; slug?: string; provider?: string; status: string; error?: string; raw?: string }> = [];

    // --- Fetch Random Model Pool ---
    const { data: models } = await supabaseAdmin
      .from("Model")
      .select("id, name, gender, slug, ModelImage(imageUrl)")
      .limit(30);

    const validModels = (models || []).filter(m => (m as any).ModelImage?.length > 0);

    for (const niche of cluster.niches) {
      // Pick 3 random models for this specific niche
      const selectedModels = validModels.sort(() => 0.5 - Math.random()).slice(0, 3);
      const talentContext = selectedModels
        .map((m, i) => `[FEATURED TALENT ${i+1}: ${m.name} (${m.gender}), Profile: /model/${m.slug}, Image: ${(m as any).ModelImage[0].imageUrl}]`)
        .join("\n");

      const systemPrompt = `[SYSTEM ROLE]
You are the WhoKnows Oracle, a premium SEO Editor. 
Task: Generate an ELITE, long-form industrial landing page (8-14 sections).
Topic: ${niche} Modeling in Bali (International SEO Gold).

[FEATURED TALENT PORTFOLIO]
${talentContext}

[CONTENT STRUCTURE]
Draft 8-14 distinct sections including:
1. Executive Industrial Hook
2. Why Bali for ${niche}
3. Technical Talent Profiles (Inject the Portfolio links provided)
4. Casting & Production Logistics
5. Client Benefits
6. Location Geospatial cues
7. FAQ
8. Professional CTA

[OUTPUT]
Return strictly JSON following this schema:
{
  "seo": { "title": "string", "metaDescription": "string", "targetKeyword": "${niche}", "openGraphDescription": "string" },
  "clusterCategory": "${cluster.name}",
  "contentMarkdown": "full long-form markdown"
}`;

      const { text: rawText, provider } = await intelligence.generateresponse({
        systemPrompt,
        messages: [{ role: 'user', content: `Architect the complete ${niche} authority page.` }],
        model: "gemini-2.0-flash" // Calibrated to the project's confirmed workable model list
      });

      try {
        const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
        const parsed = ClusterPageSchema.parse(JSON.parse(cleaned));

        const slug = `${cluster.slug}-${niche.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`.slice(0, 100);
        
        const { data: savedPage } = await supabaseAdmin.from("ClusterPages").insert({
          title: parsed.seo.title,
          slug: slug,
          clusterCategory: cluster.name,
          clusterSlug: cluster.slug,
          content: parsed.contentMarkdown,
          seoMetadata: parsed.seo,
          status: "PUBLISHED", 
          publishedAt: new Date(),
        }).select().single();

        results.push({ niche, slug, provider, status: "SUCCESS" });

        // Audit Log
        await supabaseAdmin.from("Ai_Audit_Logs").insert({
          actor: "SYSTEM_BULK",
          actionType: "CLUSTER_GENERATED",
          payload: { slug, niche, cluster: cluster.name, provider }
        });
      } catch (jsonErr) {
        console.error(`[BulkCluster] JSON Parse failed for ${niche}:`, jsonErr);
        results.push({ niche, status: "FAILED", error: "JSON_PARSE_ERROR", raw: rawText.slice(0, 100) });
      }
    }

    return NextResponse.json({ success: true, cluster: cluster.name, generated: results.length, details: results });

  } catch (error: any) {
    console.error("[BulkCluster] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
