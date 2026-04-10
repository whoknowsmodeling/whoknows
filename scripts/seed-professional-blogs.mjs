/**
 * Seed 2 Professional Blogs for WhoKnows Models
 * Run with: bun scripts/seed-professional-blogs.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

import { v4 as uuidv4 } from 'uuid';

const blogs = [
  {
    id: uuidv4(),
    title: "The Bali Advantage: A Complete Guide to International Production & Casting",
    slug: "the-bali-advantage-international-production-casting",
    status: "PUBLISHED",
    publishedAt: new Date().toISOString(),
    seoMetadata: {
      title: "The Bali Advantage | International Production & Casting Guide",
      metaDescription: "Discover why Bali has become the premier destination for international fashion productions and high-caliber commercial casting.",
      targetKeyword: "Bali Production Guide",
      openGraphDescription: "An in-depth analysis of the Bali modeling and production ecosystem for global brands."
    },
    contentContent: `
## Why Bali dominates the South East Asian Production Landscape

Bali has evolved from a tropical getaway into one of the most sophisticated production hubs in the world. For international brands and advertising agencies, the island offers a unique convergence of high-fashion aesthetics, top-tier international talent, and world-class logistical support.

### 1. The Light: A Natural Studio
Photographers often cite the "Bali Golden Hour" as a primary reason for choosing the island. Unlike the harsh, high-contrast sunlight of colder climates, Bali's equatorial position provides a diffused, soft-box effect that is ideal for skin tones and high-detail fashion photography. This "Industrial Light" reduces post-production costs and delivers a cinematic quality that is near-impossible to replicate in a studio.

### 2. Global Roster, Local Pricing
At WhoKnows Models, we represent talent from Europe, the Americas, and Asia—all based in Bali. This allows international clients to cast high-caliber models without the heavy overhead of international flights and per-diems. You get the quality of a Milan or Paris agency with the efficiency of a local production.

### 3. Diversity of Scenic Backdrops
Within a two-hour drive, a production team can move from brutalist volcanic landscapes to minimalist luxury villas, lush tropical jungles, and pristine beaches. This allows for a multi-campaign shoot (Summer, editorial, and lifestyle) all within a single location.

### Conclusion
Choosing Bali for your next campaign isn't just a scenic choice; it's a strategic industrial decision. WhoKnows Models provides the bridge between these stunning locations and the professional talent required to make them come alive.
    `
  },
  {
    id: uuidv4(),
    title: "Professional Casting Standards: What International Models Need to Know for SE Asia",
    slug: "professional-casting-standards-models-se-asia",
    status: "PUBLISHED",
    publishedAt: new Date().toISOString(),
    seoMetadata: {
      title: "Model Casting Standards in Southeast Asia | WhoKnows Models",
      metaDescription: "An educational guide for international models on navigating professional standards, etiquette, and competition in the Bali market.",
      targetKeyword: "Model Professional Standards",
      openGraphDescription: "Expert advice for models looking to succeed in the competitive Bali and Southeast Asian fashion markets."
    },
    contentContent: `
## Navigating Excellence in a Global Market

The Bali modeling market is highly competitive. With international brands increasingly focusing their production budgets on the island, the standards for professional conduct have reached an all-time high. 

### ETiquette and the "Indonesian Warmth"
While international standards of punctuality and professionalism are non-negotiable, the Bali market values a specific type of social intelligence. We call it "Professional Warmth." Successful models in this region are those who can balance a high-fashion, high-energy presence on camera with a humble, collaborative attitude on set.

### Technical Readiness
International casting directors in Bali expect models to arrive with a "Zero Latency" mindset. This means:
- **Digital Portfolio Mastery**: Having an updated, high-resolution digital composite ready for instant transmission.
- **Physical Maintenance**: Consistent grooming standards that match your agency digitals.
- **Industry Knowledge**: Understanding the specific brand aesthetic of the client before stepping into the room.

### Sustainable Career Growth
Longevity in the SE Asian market depends on your reputation. At WhoKnows Models, we mentor our talent to view every job as an audition for the next ten. Respect for the production crew, hair/makeup artists, and assistants is what separates the temporary "faces" from the industry icons.

### The Role of Your Agency
Your agency is your advocate, but you are the product. Maintaining open communication with your bookers at WhoKnows ensures we can position you for the highest-value contracts with Tier-1 international brands.
    `
  }
];

async function seed() {
  console.log('🌱 Seeding Professional Blogs...');
  
  for (const blog of blogs) {
    const { error } = await supabase.from('Blog').insert({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      status: blog.status,
      publishedAt: blog.publishedAt,
      updatedAt: new Date().toISOString(),
      content: blog.contentContent,
      seoMetadata: blog.seoMetadata
    });

    if (error) {
      console.error(`❌ Error seeding [${blog.title}]:`, error.message);
    } else {
      console.log(`✅ Seeded: ${blog.title}`);
    }
  }
}

seed();
