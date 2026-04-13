import { PrismaClient } from "@prisma/client";
import 'dotenv/config';

const prisma = new PrismaClient();

async function fixPermissions() {
  console.log("🚀 Attempting to restore service_role permissions via Prisma Raw SQL...");
  try {
    // These commands require the connection string to have administrative rights (standard for Prisma)
    await prisma.$executeRawUnsafe(`GRANT USAGE ON SCHEMA public TO service_role;`);
    await prisma.$executeRawUnsafe(`GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;`);
    await prisma.$executeRawUnsafe(`GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;`);
    await prisma.$executeRawUnsafe(`GRANT ALL PRIVILEGES ON ALL ROUTINES IN SCHEMA public TO service_role;`);
    
    console.log("✅ SQL Permissions commands executed successfully.");
  } catch (error) {
    console.error("❌ Failed to execute raw SQL:", error);
    console.log("MANUAL ACTION REQUIRED: Run the following SQL in your Supabase SQL Editor:");
    console.log("GRANT USAGE ON SCHEMA public TO service_role;");
    console.log("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;");
  } finally {
    await prisma.$disconnect();
  }
}

fixPermissions();
