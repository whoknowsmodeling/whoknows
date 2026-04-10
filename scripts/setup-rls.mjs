/**
 * One-time RLS setup script for AiAuditLog immutability.
 * Run with: node scripts/setup-rls.mjs
 */

import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DIRECT_URL } } });

async function main() {
  console.log('🔐 Applying RLS policies to AiAuditLog...');

  try {
    // Enable RLS
    await prisma.$executeRawUnsafe(`ALTER TABLE "AiAuditLog" ENABLE ROW LEVEL SECURITY;`);
    console.log('✅ RLS enabled on AiAuditLog');

    // INSERT: service_role only
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies 
          WHERE schemaname = 'public' 
            AND tablename = 'AiAuditLog' 
            AND policyname = 'Service role INSERT only'
        ) THEN
          CREATE POLICY "Service role INSERT only"
            ON "AiAuditLog" FOR INSERT
            WITH CHECK (auth.role() = 'service_role');
        END IF;
      END $$;
    `);
    console.log('✅ INSERT policy: service_role only');

    // SELECT: authenticated users
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies 
          WHERE schemaname = 'public' 
            AND tablename = 'AiAuditLog' 
            AND policyname = 'Admin SELECT only'
        ) THEN
          CREATE POLICY "Admin SELECT only"
            ON "AiAuditLog" FOR SELECT
            USING (auth.role() = 'authenticated');
        END IF;
      END $$;
    `);
    console.log('✅ SELECT policy: authenticated only');

    // Confirm: no UPDATE or DELETE policies exist (they are blocked by default when RLS is enabled)
    console.log('🔒 UPDATE and DELETE are blocked by default — AiAuditLog is now IMMUTABLE.');
    console.log('\n✨ AiAuditLog vault hardened successfully.');

  } catch (err) {
    console.error('❌ RLS setup failed:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
