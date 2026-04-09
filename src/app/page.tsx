import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { ModelCarousel } from '@/components/models/ModelCarousel';
import { CampaignGrid } from '@/components/models/CampaignCard';
import { mockModels, mockCampaigns, mockHeroSlides, mockClients } from '@/lib/data';
import { getPublicHomeData } from '@/lib/edge-data';

export const revalidate = 60; // ISR: revalidate every minute for instant loading

export const metadata = generateSEO({
  title: 'WhoKnows Models | International Modelling Agency',
  description:
    'WhoKnows Models is an international modelling agency representing the finest talent worldwide. Discover our roster of exceptional models for fashion, editorial, and commercial work.',
  keywords: [
    'modelling agency',
    'fashion models',
    'model management',
    'fashion industry',
    'editorial models',
    'runway models',
    'international models',
    'WhoKnows Models',
  ],
  canonical: '/',
});

async function getData() {
  const data = await getPublicHomeData();
  
  if (!data) {
    // Fall back to mock data if DB is unreachable
    return {
      featuredModels: mockModels.filter((m) => m.featured).slice(0, 4) as Model[],
      campaigns: mockCampaigns.slice(0, 2) as unknown as Campaign[],
      heroSlides: mockHeroSlides,
      clients: mockClients,
      galleryModels: mockModels.slice(0, 6) as Model[],
    };
  }

  // Cast types for UI components
  const typedCampaigns = data.campaigns as unknown as Campaign[];
  const typedModels = data.featuredModels as unknown as Model[];

  return {
    featuredModels: typedModels.length > 0 ? typedModels : (mockModels.filter((m) => m.featured).slice(0, 4) as Model[]),
    campaigns: typedCampaigns.length > 0 ? typedCampaigns : (mockCampaigns.slice(0, 2) as unknown as Campaign[]),
    heroSlides: data.heroSlides.length > 0 ? data.heroSlides : mockHeroSlides,
    clients: data.clients.length > 0 ? data.clients : mockClients,
    galleryModels: typedModels.length > 0 ? typedModels.slice(0, 18) : (mockModels.slice(0, 6) as Model[]),
  };
}

export default async function HomePage() {
  const { featuredModels, campaigns, heroSlides, clients, galleryModels } = await getData();

  return (
    <>
      <HeroVideo 
        slide={heroSlides[0]} 
        videoSrc="/Hero-optimized.webm" 
      />

      <section className="py-12 lg:py-20 bg-white" aria-labelledby="featured-models-heading">
        <div className="container mx-auto px-4 lg:px-8 mb-8 lg:mb-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">Our Talent</p>
              <h2 id="featured-models-heading" className="font-serif text-3xl lg:text-4xl font-medium tracking-tight">Featured Models</h2>
            </div>
            <Link href="/women" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all underline underline-offset-4">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="w-full">
          <Suspense fallback={<div className="w-full h-96 animate-pulse bg-neutral-100" />}>
            <ModelCarousel models={featuredModels} />
          </Suspense>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-neutral-50" aria-labelledby="agency-intro-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="agency-intro-heading" className="font-serif text-3xl lg:text-5xl font-medium tracking-tight mb-6">Where Talent Meets Opportunity</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              WhoKnows Models is a premier international modelling agency dedicated to discovering, developing, and representing the most promising talent in the fashion industry.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/about" className="px-8 py-3 bg-black text-white font-medium text-sm uppercase tracking-wider hover:bg-neutral-800 transition-colors">About Us</Link>
              <Link href="/apply" className="px-8 py-3 border border-black text-black font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors">Apply Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white" aria-labelledby="campaigns-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8 lg:mb-12">
            <div>
              <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">Recent Work</p>
              <h2 id="campaigns-heading" className="font-serif text-3xl lg:text-4xl font-medium tracking-tight">Latest Campaigns</h2>
            </div>
            <Link href="/jobs" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64 animate-pulse bg-neutral-100" />}>
            <CampaignGrid campaigns={campaigns} />
          </Suspense>
        </div>
      </section>

      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero/hero-3.jpg" alt="" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="font-serif text-3xl lg:text-5xl font-medium tracking-tight mb-4">Become a Model</h2>
            <p className="text-lg text-white/80 mb-8">Are you ready to start your modelling career? Submission is free.</p>
            <Link href="/apply" className="inline-block px-8 py-3 bg-white text-black font-medium text-sm uppercase tracking-wider hover:bg-neutral-100 transition-colors">Apply Now</Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white" aria-labelledby="gallery-heading">
        <div className="container mx-auto px-4 lg:px-8 mb-12">
          <div className="text-center">
            <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">@whoknowsmodels</p>
            <h2 id="gallery-heading" className="font-serif text-3xl lg:text-4xl font-medium tracking-tight">Follow Our Journey</h2>
          </div>
        </div>
        <div className="w-full">
          <Suspense fallback={<div className="w-full h-96 animate-pulse bg-neutral-100" />}>
            <ModelCarousel models={galleryModels} />
          </Suspense>
        </div>
        <div className="container mx-auto px-4 lg:px-8 mt-12 text-center">
          <a href="https://instagram.com/whoknows.models" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
            Follow on Instagram <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-neutral-50 border-t border-neutral-100">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-center text-sm uppercase tracking-wider text-neutral-500 mb-8">Trusted by Leading Brands</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {clients.map((client) => (
              <div key={client.id} className="text-neutral-400 hover:text-black transition-colors text-lg font-medium">{client.name}</div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([{ name: 'Home', url: '/' }])),
        }}
      />
    </>
  );
}
