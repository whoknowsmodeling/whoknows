import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroSlider } from '@/components/sections/HeroSlider';
import { ModelGrid } from '@/components/models/ModelCard';
import { CampaignGrid } from '@/components/models/CampaignCard';
import { mockModels, mockCampaigns, mockHeroSlides, mockClients } from '@/lib/data';
import { db } from '@/lib/db';
import type { Model, Campaign } from '@/types';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 3600; // ISR: revalidate every hour

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
  ],
  canonical: '/',
});

async function getData() {
  try {
    const [dbModels, dbCampaigns, dbHeroSlides, dbClients] = await Promise.all([
      db.model.findMany({
        where: { featured: true },
        include: { images: { orderBy: { order: 'asc' } } },
        orderBy: { order: 'asc' },
        take: 4,
      }),
      db.campaign.findMany({
        include: {
          images: { orderBy: { order: 'asc' } },
          models: { include: { model: { include: { images: { where: { isPrimary: true }, take: 1 } } } } },
        },
        orderBy: { order: 'asc' },
        take: 2,
      }),
      db.heroSlide.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      }),
      db.client.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      }),
    ]);

    // Prisma returns `gender` as `string`; cast to our typed Model/Campaign interfaces
    const typedModels = dbModels as unknown as Model[];
    const typedCampaigns = dbCampaigns as unknown as Campaign[];

    return {
      featuredModels: typedModels.length > 0 ? typedModels : (mockModels.filter((m) => m.featured).slice(0, 4) as Model[]),
      campaigns: typedCampaigns.length > 0 ? typedCampaigns : (mockCampaigns.slice(0, 2) as unknown as Campaign[]),
      heroSlides: dbHeroSlides.length > 0 ? dbHeroSlides : mockHeroSlides,
      clients: dbClients.length > 0 ? dbClients : mockClients,
      galleryModels: typedModels.length > 0 ? typedModels.slice(0, 6) : (mockModels.slice(0, 6) as Model[]),
    };
  } catch {
    // Fall back to mock data if DB is unreachable
    return {
      featuredModels: mockModels.filter((m) => m.featured).slice(0, 4) as Model[],
      campaigns: mockCampaigns.slice(0, 2) as unknown as Campaign[],
      heroSlides: mockHeroSlides,
      clients: mockClients,
      galleryModels: mockModels.slice(0, 6) as Model[],
    };
  }
}

export default async function HomePage() {
  const { featuredModels, campaigns, heroSlides, clients, galleryModels } = await getData();

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

      {/* Featured Models Section */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="featured-models-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8 lg:mb-12">
            <div>
              <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
                Our Talent
              </p>
              <h2 id="featured-models-heading" className="font-serif text-3xl lg:text-4xl font-medium tracking-tight">
                Featured Models
              </h2>
            </div>
            <Link
              href="/women"
              className="hidden sm:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
              aria-label="View all models"
            >
              View All <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <Suspense fallback={<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-96 animate-pulse bg-neutral-100 rounded" />}>
            <ModelGrid models={featuredModels} columns={4} />
          </Suspense>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/women"
              className="inline-flex items-center gap-2 text-sm font-medium"
            >
              View All Models <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Agency Introduction */}
      <section className="py-16 lg:py-24 bg-neutral-50" aria-labelledby="agency-intro-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="agency-intro-heading" className="font-serif text-3xl lg:text-5xl font-medium tracking-tight mb-6">
              Where Talent Meets Opportunity
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              WhoKnows Models is a premier international modelling agency dedicated to
              discovering, developing, and representing the most promising talent in the
              fashion industry. With a global network and an eye for excellence, we connect
              our models with leading brands, designers, and publications worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/about"
                className="px-8 py-3 bg-black text-white font-medium text-sm uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/apply"
                className="px-8 py-3 border border-black text-black font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Campaigns */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="campaigns-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8 lg:mb-12">
            <div>
              <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
                Recent Work
              </p>
              <h2 id="campaigns-heading" className="font-serif text-3xl lg:text-4xl font-medium tracking-tight">
                Latest Campaigns
              </h2>
            </div>
            <Link
              href="/jobs"
              className="hidden sm:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
              aria-label="View all campaigns"
            >
              View All <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64 animate-pulse bg-neutral-100 rounded" />}>
            <CampaignGrid campaigns={campaigns} />
          </Suspense>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-sm font-medium"
            >
              View All Campaigns <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Apply CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden" aria-label="Apply to become a model">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/hero/hero-3.jpg"
            alt=""
            fill
            className="object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="font-serif text-3xl lg:text-5xl font-medium tracking-tight mb-4">
              Become a Model
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Are you ready to start your modelling career? We&apos;re always looking for
              fresh faces and unique talent. Submit your application today and take the
              first step towards an exciting journey in the fashion industry.
            </p>
            <Link
              href="/apply"
              className="inline-block px-8 py-3 bg-white text-black font-medium text-sm uppercase tracking-wider hover:bg-neutral-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Style Gallery */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="gallery-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
              @whoknowsmodels
            </p>
            <h2 id="gallery-heading" className="font-serif text-3xl lg:text-4xl font-medium tracking-tight">
              Follow Our Journey
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2" role="list" aria-label="Model gallery">
            {galleryModels.map((model) => {
              const primaryImage =
                model.images.find((img) => img.isPrimary) || model.images[0];
              return (
                <Link
                  key={model.id}
                  href={`/model/${model.slug}`}
                  className="relative aspect-square overflow-hidden group"
                  role="listitem"
                  aria-label={`View ${model.name}'s profile`}
                >
                  {primaryImage && (
                    <Image
                      src={primaryImage.imageUrl}
                      alt={model.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16.66vw"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" aria-hidden="true" />
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://instagram.com/whoknowsmodels"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              aria-label="Follow WhoKnows Models on Instagram (opens in new tab)"
            >
              Follow on Instagram <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-t border-neutral-100" aria-label="Trusted brands and clients">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-center text-sm uppercase tracking-wider text-neutral-500 mb-8">
            Trusted by Leading Brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {clients.map((client) => (
              <div
                key={client.id}
                className="text-neutral-400 hover:text-black transition-colors text-lg font-medium"
              >
                {client.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
            ])
          ),
        }}
      />
    </>
  );
}
