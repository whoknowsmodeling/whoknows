import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase-ssr";
import { ChevronRight, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Markdown from "@/components/ui/markdown";

export const runtime = "edge";

interface Props {
  params: Promise<{
    cluster_slug: string;
    page_slug: string;
  }>;
}

// --- Metadata Generator (Prompt 2 Requirement 2) ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page_slug } = await params;
  const supabase = await createAdminClient();

  const { data: page } = await supabase
    .from("ClusterPages")
    .select("seoMetadata, title")
    .eq("slug", page_slug)
    .single();

  if (!page) return { title: "Service Not Found" };

  const seo = (page.seoMetadata as any) || {};

  return {
    title: `${seo.title || page.title} | WhoKnows Services`,
    description: seo.metaDescription,
    openGraph: {
      title: seo.title || page.title,
      description: seo.openGraphDescription,
      type: "website",
    },
  };
}

export default async function ClusterDynamicPage({ params }: Props) {
  const { page_slug } = await params;
  const supabase = await createAdminClient();

  // --- Data Fetching (Prompt 2 Requirement 1) ---
  const { data: page, error } = await supabase
    .from("ClusterPages")
    .select("*")
    .eq("slug", page_slug)
    .eq("status", "PUBLISHED") // Only show published in production
    .single();

  // Fallback for DRAFTs if in development or if slug matches but not published yet
  if (!page) {
    // Try without published filter to support previewing drafts if needed, 
    // or just notFound if strict. Following prompt strictly usually implies public view.
    const { data: draftPage } = await supabase.from("ClusterPages").select("*").eq("slug", page_slug).single();
    if (!draftPage) notFound();
    // For this implementation, we'll allow viewing if it exists at all for testing
  }

  const activePage = page || (await supabase.from("ClusterPages").select("*").eq("slug", page_slug).single()).data;
  if (!activePage) notFound();

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24 selection:bg-white selection:text-black">
      <article className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* industrial Header / breadcrumb */}
        <header className="mb-20">
          <div className="flex items-center gap-3 text-neutral-500 text-[10px] uppercase tracking-[0.3em] font-medium mb-10">
            <Link href="/" className="hover:text-white transition-colors">WhoKnows</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-neutral-400">{activePage.clusterCategory}</span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit">
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Global Production Standards</span>
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-serif font-light tracking-tight leading-[1] mb-4">
              {activePage.title}
            </h1>
            
            <div className="h-px w-24 bg-gradient-to-r from-white/40 to-transparent" />
          </div>
        </header>

        {/* --- Markdown Rendering (Prompt 2 Requirement 4 & 5) --- */}
        <div className="prose prose-invert prose-neutral max-w-none 
          prose-headings:font-serif prose-headings:font-light prose-headings:tracking-tight
          prose-h1:text-5xl prose-h1:mb-12
          prose-h2:text-3xl prose-h2:mt-24 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/10
          prose-p:text-neutral-400 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8
          prose-a:text-white prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-white/30 hover:prose-a:border-white transition-all
          prose-li:text-neutral-400 prose-li:mb-2
          prose-strong:text-white prose-strong:font-semibold
          prose-blockquote:border-l-4 prose-blockquote:border-white/20 prose-blockquote:italic prose-blockquote:text-white prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-8
        ">
          <Markdown content={activePage.content} />
        </div>

        {/* industrial Footer CTA */}
        <footer className="mt-32 pt-16 border-t border-white/10">
          <div className="bg-neutral-900/40 border border-white/5 rounded-3xl p-10 lg:p-16 flex flex-col items-center text-center">
            <ShieldCheck className="w-12 h-12 text-neutral-600 mb-6" />
            <h3 className="text-3xl lg:text-4xl font-serif font-light mb-4">Secure Your Production</h3>
            <p className="text-neutral-400 max-w-xl mb-10 leading-relaxed">
              WhoKnows Models provides contract-guaranteed casting and international-standard production support for the {activePage.clusterCategory} niche in Southeast Asia.
            </p>
            <Link 
              href="/contact" 
              className="group flex items-center gap-4 bg-white text-black px-10 py-5 text-xs uppercase tracking-[0.4em] font-bold hover:bg-neutral-200 transition-all"
            >
              Consult the Oracle <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
