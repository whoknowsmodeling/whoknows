import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const modelsToFeature = ["Madeline", "Celine", "Laura", "Jasmin"];

  for (const name of modelsToFeature) {
    await prisma.model.updateMany({
      where: { name: name },
      data: { featured: true }
    });
    console.log(`Marked ${name} as featured.`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
