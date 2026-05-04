const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'Race Series', slug: 'race-series' },
    { name: 'Urban', slug: 'urban' },
    { name: 'Heritage', slug: 'heritage' },
    { name: 'Touring', slug: 'touring' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const raceSeries = await prisma.category.findUnique({ where: { slug: 'race-series' } });
  const urban = await prisma.category.findUnique({ where: { slug: 'urban' } });
  const heritage = await prisma.category.findUnique({ where: { slug: 'heritage' } });
  const touring = await prisma.category.findUnique({ where: { slug: 'touring' } });

  const products = [
    {
      name: "Vanguard Titan Racing",
      description: "Elite ballistic-grade racing jacket designed for high-velocity protection.",
      price: 1450,
      images: ["/assets/sohag_hawlader-ai-generated-9034981_1920.webp"],
      categoryId: raceSeries.id,
      isFeatured: true,
      stock: 10,
    },
    {
      name: "Stealth Commuter Shell",
      description: "Low-profile urban shell for the daily metropolitan navigator.",
      price: 850,
      images: ["/assets/derneuemann-jacket-2821961_1920.webp"],
      categoryId: urban.id,
      isFeatured: true,
      stock: 15,
    },
    {
      name: "Apex Kinetic Armor",
      description: "Advanced D3O protection matrix with hyper-minimalist aesthetic.",
      price: 1200,
      images: ["/assets/image (1).webp"],
      categoryId: raceSeries.id,
      isFeatured: true,
      stock: 8,
    },
    {
      name: "Heritage Cafe Racer",
      description: "Vintage-inspired full-grain leather for the timeless soul.",
      price: 950,
      images: ["/assets/peterlesliemorris-motorcycle-1829461_1920.webp"],
      categoryId: heritage.id,
      isFeatured: true,
      stock: 5,
    },
    {
      name: "Velocity Air Mesh",
      description: "Maximum airflow engineering for tropical urban environments.",
      price: 600,
      images: ["/assets/splitshire-biker-407123_1920.webp"],
      categoryId: urban.id,
      isFeatured: true,
      stock: 20,
    },
    {
      name: "Nomad Gore-Tex Pro",
      description: "Uncompromising touring protection for cross-continental journeys.",
      price: 1100,
      images: ["/assets/stocksnap-dark-2598357_1920.webp"],
      categoryId: touring.id,
      isFeatured: true,
      stock: 12,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
