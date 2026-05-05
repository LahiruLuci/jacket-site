const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function update() {
  try {
    const slug = 'navy-guard-water-resistant-utility-jacket';
    const images = [
      '/assets/navy-blue-jacket/new-nevy.webp',
      '/assets/navy-blue-jacket/front-side.jpeg',
      '/assets/navy-blue-jacket/back-side.jpeg',
      '/assets/navy-blue-jacket/side-1.png'
    ];

    const updated = await prisma.product.update({
      where: { slug: slug },
      data: { images: images }
    });

    console.log('Successfully updated product images for:', updated.name);
    process.exit(0);
  } catch (err) {
    console.error('Update Failed:', err);
    process.exit(1);
  }
}

update();
