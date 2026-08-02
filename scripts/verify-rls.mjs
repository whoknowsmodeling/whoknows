import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DIRECT_URL } } });

const rows = await prisma.$queryRawUnsafe(`
  SELECT c.relname AS table_name, c.relrowsecurity AS rls_enabled
  FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public' AND c.relkind = 'r'
  ORDER BY c.relname;
`);

const stillOff = rows.filter((r) => !r.rls_enabled);
console.log(stillOff.length === 0
  ? `All ${rows.length} public tables now have RLS enabled.`
  : `Still missing RLS: ${stillOff.map((r) => r.table_name).join(', ')}`);

await prisma.$disconnect();
