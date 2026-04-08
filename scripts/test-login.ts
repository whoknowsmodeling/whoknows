import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt-ts";

const prisma = new PrismaClient();

async function main() {
  const email = "whoknowsmodeling@gmail.com";
  const password = "Car4sale123!";

  const user = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("User not found!");
    return;
  }

  const isValid = await compare(password, user.password);
  console.log("Is Valid:", isValid);
}

main().catch(console.error).finally(() => prisma.$disconnect());
