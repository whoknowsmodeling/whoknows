import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.adminUser.findMany();
  console.log("Admin Users in DB:", users);
}

main().catch(console.error).finally(() => prisma.$disconnect());
