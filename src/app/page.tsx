import { Suspense } from 'react';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { FacesSection } from '@/components/sections/FacesSection';
import { ArchivesSection } from '@/components/sections/ArchivesSection';
import { RosterSection } from '@/components/sections/RosterSection';
import { CTASection } from '@/components/sections/CTASection';
import { BrandsSection } from '@/components/sections/BrandsSection';
import { getPublicHomeData, getAllModels } from '@/lib/edge-data';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 60;

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
  const [homeData, allModels] = await Promise.all([
    getPublicHomeData(),
    getAllModels(),
  ]);

  const womenModels = allModels.filter(
    (m) => m.gender?.toLowerCase() === 'women'
  );
  const menModels = allModels.filter(
    (m) => m.gender?.toLowerCase() === 'men'
  );

  return {
    faceModels:  homeData?.faceModels  ?? [],
    heroSlides:  homeData?.heroSlides  ?? [],
    clients:     homeData?.clients     ?? [],
    allModels,
    womenModels,
    menModels,
  };
}

// ─── Skeleton fallbacks ──────────────────────────────────────────────────────

function FacesSkeleton() {
  return (
    <div className="py-12 bg-white">
      <div className="px-4 lg:px-8 mb-6 h-4 w-16 bg-neutral-100" />
      <div className="flex gap-[1px]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-[0_0_25%] aspect-square bg-neutral-100 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="py-12 bg-white">
      <div className="px-4 lg:px-8 mb-6 h-20 w-64 bg-neutral-100 animate-pulse" />
      <div className="grid grid-cols-3 gap-[1px]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-neutral-100 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const { faceModels, heroSlides, clients, allModels, womenModels, menModels } =
    await getData();

  return (
    <>
      {/* ── HERO (IMMUTABLE) ─────────────────────────────────── */}
      <HeroVideo slide={heroSlides[0]} videoSrc="/Hero-optimized.webm" />

      {/* ── SECTION 1: FACES ─────────────────────────────────── */}
      <Suspense fallback={<FacesSkeleton />}>
        <FacesSection models={faceModels} />
      </Suspense>

      {/* ── SECTION 2: ARCHIVES ──────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <ArchivesSection models={allModels} />
      </Suspense>

      {/* ── SECTION 3: MEN ───────────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <RosterSection gender="men" models={menModels} showSubtitle={false} />
      </Suspense>

      {/* ── SECTION 4: WOMEN ─────────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <RosterSection gender="women" models={womenModels} showSubtitle={false} />
      </Suspense>

      {/* ── SECTION 5: CTA ───────────────────────────────────── */}
      <CTASection />

      {/* ── SECTION 6: BRANDS ────────────────────────────────── */}
      <BrandsSection clients={clients} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([{ name: 'Home', url: '/' }])
          ),
        }}
      />
    </>
  );
}
