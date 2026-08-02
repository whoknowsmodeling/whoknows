/**
 * Enables Row Level Security on every public table that's missing it
 * (flagged by Supabase's Security Advisor). All real data access in this
 * app goes through `supabaseAdmin` (the service role key, in
 * src/lib/supabase.ts), which always bypasses RLS — so this is safe to
 * apply with zero policies: it just closes off direct table access via
 * the public anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY, exposed client-side)
 * without touching how the app itself reads/writes data.
 *
 * Run with: node scripts/enable-rls.mjs
 */

import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DIRECT_URL } } });

const TABLES = [
  'AdminLog',
  'AdminUser',
  'Ai_Audit_Logs',
  'Application',
  'ApplicationPhoto',
  'Blog',
  'Campaign',
  'CampaignImage',
  'CampaignModel',
  'Client',
  'ClusterPages',
  'ContactSubmission',
  'HeroSlide',
  'Model',
  'ModelImage',
  'PageContent',
  'website_settings',
];

async function main() {
  console.log(`🔐 Enabling RLS on ${TABLES.length} public tables...`);

  for (const table of TABLES) {
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "public"."${table}" ENABLE ROW LEVEL SECURITY;`);
      console.log(`✅ RLS enabled: ${table}`);
    } catch (err) {
      console.error(`❌ Failed on ${table}:`, err.message);
    }
  }

  console.log('\n✨ Done. No policies were added — anon/authenticated roles now have zero access by default, matching how the app already works (service role only).');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
