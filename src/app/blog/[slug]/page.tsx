import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { getBlogBySlug } from '@/lib/edge-data';
import { ChevronLeft, Calendar, Share2, Tag } from 'lucide-react';
import Link from 'next/link';
import Markdown from '@/components/ui/markdown';

export const runtime = 'edge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return { title: 'Not Found' };

  return {
    title: blog.seoMetadata?.title || blog.title,
    description: blog.seoMetadata?.metaDescription,
    openGraph: {
      title: blog.seoMetadata?.title || blog.title,
      description: blog.seoMetadata?.metaDescription,
      type: 'article',
      publishedTime: blog.publishedAt,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.status !== 'PUBLISHED') {
    notFound();
  }

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24">
      <article className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm uppercase tracking-widest mb-12"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Insights
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-6 text-neutral-500 text-[11px] uppercase tracking-[0.2em] mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              {blog.publishedAt && format(new Date(blog.publishedAt), 'MMMM d, yyyy')}
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" />
              {blog.seoMetadata?.targetKeyword || 'Industry Analysis'}
            </div>
          </div>

          <h1 className="text-4xl lg:text-7xl font-serif font-light tracking-tight leading-[1.1] mb-8">
            {blog.title}
          </h1>

          {blog.seoMetadata?.metaDescription && (
            <p className="text-xl text-neutral-400 font-light leading-relaxed border-l-2 border-white/20 pl-6 lg:pl-8 italic">
              {blog.seoMetadata.metaDescription}
            </p>
          )}
        </header>

        {/* Content Section */}
        <div className="prose prose-invert prose-neutral max-w-none prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:text-lg prose-headings:font-serif prose-headings:font-light prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-a:text-white prose-a:underline hover:prose-a:no-underline transition-all prose-li:text-neutral-300 prose-strong:text-white prose-blockquote:border-white/20 prose-blockquote:text-white prose-blockquote:italic">
          <Markdown content={blog.content} />
        </div>

        {/* Footer / Share */}
        <footer className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <span className="text-neutral-500 text-xs uppercase tracking-widest">Share Analysis:</span>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <Link href="/apply" className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-colors rounded-sm">
            Become a Model
          </Link>
        </footer>
      </article>
    </div>
  );
}
