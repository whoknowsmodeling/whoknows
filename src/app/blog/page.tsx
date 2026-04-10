import { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { getPublishedBlogs } from '@/lib/edge-data';
import { FileText, Calendar, ChevronRight } from 'lucide-react';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Blog & Industrial Insights',
  description: 'Expert perspectives on the international modelling industry, Bali production standards, and talent management.',
};

export default async function BlogListingPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <h1 className="text-4xl lg:text-6xl font-serif font-light tracking-tight mb-6">
            Industrial <span className="text-neutral-500 italic">Insights</span>
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
            Probing the intersection of global fashion standards and South East Asian production excellence. 
            Educational resources for international models and production houses.
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="border border-white/10 rounded-2xl p-12 text-center bg-neutral-900/40">
            <FileText className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
            <p className="text-neutral-500 font-medium">Oracle is currently preparing the next series of industry reports.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group flex flex-col h-full bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
              >
                <div className="p-8 lg:p-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-neutral-400">
                      Industry Report
                    </div>
                    {blog.publishedAt && (
                      <div className="flex items-center gap-1.5 text-neutral-500 text-[11px] uppercase tracking-wider">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(blog.publishedAt), 'MMM d, yyyy')}
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-serif font-light leading-tight group-hover:text-white transition-colors mb-4">
                    {blog.title}
                  </h2>

                  {blog.seoMetadata?.metaDescription && (
                    <p className="text-neutral-400 text-sm leading-relaxed mb-8 line-clamp-3">
                      {blog.seoMetadata.metaDescription}
                    </p>
                  )}

                  <div className="mt-auto flex items-center gap-2 text-white text-xs uppercase tracking-[0.2em] font-medium group-hover:gap-4 transition-all duration-300">
                    Read Analysis <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
