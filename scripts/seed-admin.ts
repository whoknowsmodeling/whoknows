import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "whoknowsmodeling@gmail.com";
  const password = "Car4sale123!";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: "admin",
    },
    create: {
      email,
      password: hashedPassword,
      name: "Super Admin",
      role: "admin",
    },
  });

  console.log("Admin account successfully created:", admin.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());
