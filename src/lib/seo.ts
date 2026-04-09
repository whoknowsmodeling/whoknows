import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://whoknows.pages.dev';
const SITE_NAME = 'WhoKnows Models';
const DEFAULT_DESCRIPTION = 'WhoKnows Models is a premier international talent management agency based in Bali, Indonesia, representing the finest models for global fashion hubs including Paris, Milan, London, and New York. Discover elite talent for high-end editorial, runway, and commercial campaigns worldwide.';
const DEFAULT_KEYWORDS = [
  'international modelling agency', 
  'global fashion models', 
  'model management Bali', 
  'Paris fashion models', 
  'Milan runway talent', 
  'London editorial models', 
  'New York commercial talent', 
  'luxury brand models', 
  'Bali model agency international'
];

export function generateSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage = '/og-image.jpg',
  canonical,
  noIndex = false,
}: {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
  
  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonical || SITE_URL,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
      creator: '@whoknowsmodels',
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

// JSON-LD Structured Data
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WhoKnows Models',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: DEFAULT_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-857-2128-8138',
      contactType: 'customer service',
      email: 'contact@whoknows.pages.dev',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://instagram.com/whoknows.models',
      'https://www.facebook.com/profile.php?id=100069628367326',
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WhoKnows Models',
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generatePersonSchema(model: {
  name: string;
  slug: string;
  height?: string | null;
  hair?: string | null;
  eyes?: string | null;
  location?: string | null;
  bio?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: model.name,
    url: `${SITE_URL}/model/${model.slug}`,
    description: model.bio,
    jobTitle: 'Fashion Model',
    workLocation: model.location,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Height',
        value: model.height,
      },
      {
        '@type': 'PropertyValue',
        name: 'Hair Color',
        value: model.hair,
      },
      {
        '@type': 'PropertyValue',
        name: 'Eye Color',
        value: model.eyes,
      },
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE_URL,
    name: 'WhoKnows Models',
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    telephone: '+62-857-2128-8138',
    email: 'contact@whoknows.pages.dev',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Indonesia',
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$$',
  };
}
