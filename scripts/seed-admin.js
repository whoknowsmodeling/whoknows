const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const email = 'whoknowsmodeling@gmail.com';
  const password = 'Car4sale123!'; 
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.adminUser.upsert({
      where: { email },
      update: { password: hashedPassword },
      create: {
        email,
        password: hashedPassword,
        name: 'Super Admin',
        role: 'admin',
      },
    });
    console.log('Admin user created/updated:', admin.email);
  } catch (e) {
    console.error('Error seeding admin:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
