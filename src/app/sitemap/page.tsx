import { Metadata } from 'next';
import Link from 'next/link';
import { getAllModels } from '@/lib/edge-data';
import { generateSEO } from '@/lib/seo';

export const revalidate = 3600; // Update once per hour

export const metadata: Metadata = generateSEO({
  title: 'Sitemap',
  description: 'A comprehensive map of all professional talent and company resources at WhoKnows Models.',
  canonical: '/sitemap',
  noIndex: true, // Sitemap pages often don't need to be indexed themselves if they're just links
});

export default async function SitemapPage() {
  const models = await getAllModels();
  
  const companyLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Apply', href: '/apply' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Contact', href: '/contact' },
    { label: 'Frequently Asked Questions', href: '/under-18' }
  ];

  const womenModels = models.filter(m => m.gender === 'women');
  const menModels = models.filter(m => m.gender === 'men');

  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="font-serif text-4xl lg:text-5xl font-medium tracking-tight mb-12 lg:mb-16">Sitemap</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company */}
          <section>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-6 font-bold">Company</h2>
            <ul className="space-y-4">
              {companyLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xl font-serif hover:text-neutral-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Women Models */}
          <section>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-6 font-bold">Women Models</h2>
            <ul className="space-y-4">
              {womenModels.map(model => (
                <li key={model.id}>
                  <Link href={`/model/${model.slug}`} className="text-xl font-serif hover:text-neutral-500 transition-colors">
                    {model.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Men Models */}
          <section>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-6 font-bold">Men Models</h2>
            <ul className="space-y-4">
              {menModels.map(model => (
                <li key={model.id}>
                  <Link href={`/model/${model.slug}`} className="text-xl font-serif hover:text-neutral-500 transition-colors">
                    {model.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Resources */}
          <section>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-6 font-bold">Legal</h2>
            <ul className="space-y-4">
              {['Terms', 'Privacy', 'Cookies'].map(label => (
                <li key={label}>
                  <Link href={`/${label.toLowerCase()}`} className="text-xl font-serif hover:text-neutral-500 transition-colors">
                    {label} Policy
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
