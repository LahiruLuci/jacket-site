const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')   // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
}

async function main() {
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    const slug = slugify(product.name);
    console.log(`Updating ${product.name} to slug: ${slug}`);
    await prisma.product.update({
      where: { id: product.id },
      data: { slug },
    });
  }
  
  console.log('Slugs updated successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
