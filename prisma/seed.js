const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create Categories
  const catRace = await prisma.category.create({
    data: { name: 'Race Series', slug: 'race-series' }
  });
  const catTour = await prisma.category.create({
    data: { name: 'Touring Series', slug: 'touring-series' }
  });
  const catUrban = await prisma.category.create({
    data: { name: 'Urban Series', slug: 'urban-series' }
  });

  // Create Products
  const products = [
    {
      name: 'Interceptor NV - Deep Sea Elite',
      description: 'The ultimate aquatic-inspired defense layer. Engineered with 1000D Navy Ballistic Weave and integrated carbon-silicate sliders for high-velocity urban deployment.',
      price: 799.00,
      images: [
        '/assets/navy-blue-jacket/front-side.jpeg',
        '/assets/navy-blue-jacket/back-side.jpeg',
        '/assets/navy-blue-jacket/side-1.png',
        '/assets/navy-blue-jacket/side-2.png',
        '/assets/navy-blue-jacket/side-3.png'
      ],
      categoryId: catUrban.id,
      stock: 12,
      material: 'Navy Ballistic Weave',
      season: 'Autumn/Winter',
      isFeatured: true
    },
    {
      name: 'Vanguard V1 - Ballistic Black',
      description: 'The pinnacle of race-grade protection. Features D3O Level 2 armor and titanium slider caps.',
      price: 899.00,
      images: [
        '/assets/splitshire-biker-407123_1920.webp',
        '/assets/sohag_hawlader-ai-generated-9034981_1920.webp',
        '/assets/derneuemann-jacket-2821961_1920.webp'
      ],
      categoryId: catRace.id,
      stock: 15,
      material: 'Kangaroo Leather',
      season: 'Summer',
      isFeatured: true
    },
    {
      name: 'Nomad GT - Slate Carbon',
      description: 'Designed for the long-distance vanguard. Waterproof, breathable, and battle-ready.',
      price: 649.00,
      images: [
        '/assets/derneuemann-jacket-2821961_1920.webp',
        '/assets/stocksnap-dark-2598357_1920.webp',
        '/assets/splitshire-biker-407123_1920.webp'
      ],
      categoryId: catTour.id,
      stock: 22,
      material: 'Gore-Tex Pro',
      season: 'All-Season',
      isFeatured: true
    },
    {
      name: 'Phantom Urban - Matte Obsidian',
      description: 'The ultimate city silhouette. Stealth aesthetics with hidden ballistic protection.',
      price: 499.00,
      images: [
        '/assets/stocksnap-dark-2598357_1920.webp',
        '/assets/splitshire-biker-407123_1920.webp',
        '/assets/sohag_hawlader-ai-generated-9034981_1920.webp'
      ],
      categoryId: catUrban.id,
      stock: 10,
      material: '1000D Aramid',
      season: 'Autumn/Spring',
      isFeatured: false
    },
    {
      name: 'Interceptor RS - Electric Blue',
      description: 'High-visibility performance. Engineered for maximum airflow and impact dispersal.',
      price: 749.00,
      images: [
        '/assets/sohag_hawlader-ai-generated-9034981_1920.webp',
        '/assets/derneuemann-jacket-2821961_1920.webp',
        '/assets/stocksnap-dark-2598357_1920.webp'
      ],
      categoryId: catRace.id,
      stock: 8,
      material: 'Perforated Cowhide',
      season: 'Summer',
      isFeatured: false
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
