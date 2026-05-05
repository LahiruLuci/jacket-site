const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const products = await prisma.product.findMany({
      select: { name: true, slug: true }
    });
    console.log(JSON.stringify(products, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Connection Failed:', err);
    process.exit(1);
  }
}

test();
