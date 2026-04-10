import Link from 'next/link';
import { supabaseAdmin } from "@/lib/supabase";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { ChevronRight, Globe, Users, Sparkles, ImageIcon } from "lucide-react";

export const runtime = 'edge';
export const revalidate = 3600; // Hourly

export default async function SitemapPage() {
  const [models, campaigns, blogs, clusters] = await Promise.all([
    supabaseAdmin.from("Model").select("name, slug, gender"),
    supabaseAdmin.from("Campaign").select("title, slug"),
    supabaseAdmin.from("Blog").select("title, slug").eq("status", "PUBLISHED"),
    supabaseAdmin.from("ClusterPages").select("title, slug, clusterSlug, clusterCategory").eq("status", "PUBLISHED"),
  ]);

  // Group clusters by category
  const clusterGroups = (clusters.data || []).reduce((acc: any, page) => {
    if (!acc[page.clusterCategory]) acc[page.clusterCategory] = [];
    acc[page.clusterCategory].push(page);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <Navigation />
      
      <main className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
        <header className="max-w-4xl mb-20">
          <h1 className="text-5xl lg:text-7xl font-serif font-light tracking-tight mb-8">Sitemap</h1>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl">
            A comprehensive navigation map of the WhoKnows Models intelligence platform, capturing our rosters, commercial works, and industrial service clusters.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {/* SEC 1: Core Navigation */}
          <section>
            <div className="flex items-center gap-3 mb-8 opacity-50">
              <Globe className="w-4 h-4" />
              <h2 className="text-[10px] uppercase font-bold tracking-[0.2em]">Platform Core</h2>
            </div>
            <ul className="space-y-4">
              {['Home', 'Models', 'Women', 'Men', 'Jobs', 'Apply', 'Contact', 'About'].map(item => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-neutral-400 hover:text-white transition-colors flex items-center group"
                  >
                    {item}
                    <ChevronRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* SEC 2: Talent Roster */}
          <section>
            <div className="flex items-center gap-3 mb-8 opacity-50">
              <Users className="w-4 h-4" />
              <h2 className="text-[10px] uppercase font-bold tracking-[0.2em]">Talent Roster</h2>
            </div>
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
              {(models.data || []).slice(0, 30).map(model => (
                <li key={model.slug}>
                  <Link href={`/model/${model.slug}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {model.name} <span className="text-[10px] opacity-30 ml-1">({model.gender})</span>
                  </Link>
                </li>
              ))}
              {(models.data?.length || 0) > 30 && (
                <li className="text-xs text-neutral-600 italic">+ {(models.data?.length || 0) - 30} more models</li>
              )}
            </ul>
          </section>

          {/* SEC 3: Industrial Blogs */}
          <section>
            <div className="flex items-center gap-3 mb-8 opacity-50">
              <Sparkles className="w-4 h-4" />
              <h2 className="text-[10px] uppercase font-bold tracking-[0.2em]">Oracle Blogs</h2>
            </div>
            <ul className="space-y-4">
              {(blogs.data || []).map(blog => (
                <li key={blog.slug}>
                  <Link href={`/blog/${blog.slug}`} className="text-sm text-neutral-400 hover:text-white transition-colors truncate block">
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* SEC 4: Service Clusters (SEO Gold) */}
          <section className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8 opacity-50">
              <Layers className="w-4 h-4" />
              <h2 className="text-[10px] uppercase font-bold tracking-[0.2em]">Service Clusters</h2>
            </div>
            <div className="space-y-10">
              {Object.entries(clusterGroups).map(([category, pages]: [any, any]) => (
                <div key={category}>
                  <h3 className="text-xs text-neutral-600 uppercase mb-4 tracking-widest">{category}</h3>
                  <ul className="space-y-3">
                    {pages.map((p: any) => (
                      <li key={p.slug}>
                        <Link href={`/services/${p.clusterSlug}/${p.slug}`} className="text-sm text-neutral-400 hover:text-white transition-colors block leading-tight">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {Object.keys(clusterGroups).length === 0 && (
                <p className="text-xs text-neutral-700 italic">No published clusters discovered.</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Layers({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m2.6 12.14 8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9" />
      <path d="m2.6 16.14 8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9" />
    </svg>
  );
}
