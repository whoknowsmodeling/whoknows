import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-ssr";
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

type ClusterPageOutput = z.infer<typeof ClusterPageSchema>;

export async function POST(req: NextRequest) {
  const supabase = await createAdminClient();

  try {
    const { clusterName, pageNiche } = await req.json();

    if (!clusterName || !pageNiche) {
      return NextResponse.json({ error: "clusterName and pageNiche are required" }, { status: 400 });
    }

    // --- Fetch Models ---
    const { data: models, error: modelsError } = await supabase
      .from("Model")
      .select("id, name, gender, slug, ModelImage(id)")
      .limit(20);

    if (modelsError || !models) throw new Error("Failed to fetch model pool");
    
    const validModels = models.filter(m => (m as any).ModelImage?.length > 0);
    const shuffled = validModels.sort(() => 0.5 - Math.random());
    const selectedModels = shuffled.slice(0, 3);

    if (selectedModels.length < 3) throw new Error("Insufficient models found.");

    const talentContext = selectedModels
      .map((m, i) => `Model ${i + 1}: ${m.name} (${m.gender}), Portfolio: /model/${m.slug}`)
      .join("\n");

    const systemPrompt = `[SYSTEM ROLE]
You are the COO of WhoKnows Models. Generate a professional B2B landing page.
Target Cluster: ${clusterName}
Specific Page Niche: ${pageNiche}

[TALENT TO FEATURE]
${talentContext}

[OUTPUT REQUIREMENTS]
Strictly output a JSON object:
{
  "seo": { "title": "string", "metaDescription": "string", "targetKeyword": "${pageNiche}", "openGraphDescription": "string" },
  "clusterCategory": "${clusterName}",
  "contentMarkdown": "long-form markdown landing page"
}`;

    // --- Intelligence Sync Execution ---
    const { text: rawText, provider } = await intelligence.generateresponse({
      systemPrompt,
      messages: [{ role: 'user', content: `Generate the ${pageNiche} landing page.` }],
      model: "gemini-1.5-pro" // Using Pro for complex landing pages
    });

    const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed: ClusterPageOutput = ClusterPageSchema.parse(JSON.parse(cleaned));

    // --- SAVE to ClusterPages ---
    const slug = `${clusterName}-${pageNiche}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const { data: savedPage, error: dbError } = await supabase
      .from("ClusterPages")
      .insert({
        title: parsed.seo.title,
        slug: slug,
        clusterCategory: parsed.clusterCategory,
        clusterSlug: clusterName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        content: parsed.contentMarkdown,
        seoMetadata: parsed.seo,
        status: "DRAFT",
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // --- Log Success ---
    await supabase.from("Ai_Audit_Logs").insert({
      actor: "WK_AI",
      actionType: "CLUSTER_GENERATED",
      payload: { slug, provider, niche: pageNiche },
    });

    return NextResponse.json({ success: true, page: savedPage, provider });

  } catch (error: any) {
    const errorMsg = error.message || String(error);
    await supabase.from("Ai_Audit_Logs").insert({
      actor: "WK_AI",
      actionType: "CLUSTER_ERROR",
      payload: { error: errorMsg },
    });
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
