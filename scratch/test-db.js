const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const categories = await prisma.category.findMany();
    console.log('Connection Successful. Categories found:', categories.length);
    process.exit(0);
  } catch (err) {
    console.error('Connection Failed:', err);
    process.exit(1);
  }
}

test();
