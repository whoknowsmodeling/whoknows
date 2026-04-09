import React from 'react';

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 border-b border-neutral-800 pb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">{title}</h1>
          <p className="text-neutral-500 text-sm tracking-widest uppercase">
            Last Updated: {lastUpdated}
          </p>
        </header>
        
        <article className="prose prose-invert prose-neutral max-w-none 
          prose-headings:font-serif prose-headings:font-medium prose-headings:text-white
          prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:mb-6
          prose-li:text-neutral-400 prose-ul:list-disc prose-ul:pl-6
          prose-strong:text-white prose-strong:font-medium
        ">
          {children}
        </article>

        <div className="mt-20 pt-12 border-t border-neutral-800 text-neutral-500 text-sm italic">
          <p>
            If you have any questions regarding this policy, please contact our legal team at 
            <a href="mailto:legal@whoknowsmodels.com" className="text-white hover:underline ml-1 not-italic">
              legal@whoknowsmodels.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
