const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateDescriptions() {
  try {
    console.log('Connecting to database...');
    
    // Update Shadow Guard
    const shadowSlug = 'shadow-guard-all-weather-performance-jacket';
    const shadowDesc = "Built for everyday wear, the Shadow Guard jacket combines durability with a clean, modern look. Its water-resistant outer layer helps protect against light rain and wind, while the lightweight construction keeps you comfortable throughout the day.\n\nDesigned for both city use and casual outdoor conditions, it offers a practical fit with enough flexibility for movement. The structured design, reinforced stitching, and multiple pockets make it a reliable choice for daily use.";

    await prisma.product.update({
      where: { slug: shadowSlug },
      data: { description: shadowDesc }
    });
    console.log('Shadow Guard description updated.');

    // Update Navy Guard
    const navySlug = 'navy-guard-water-resistant-utility-jacket';
    const navyDesc = "The Navy Guard jacket is designed for daily comfort with a focus on durability and function. Made with water-resistant fabric, it provides reliable protection in changing weather while maintaining a lightweight feel.\n\nIts balanced fit allows easy movement, making it suitable for commuting, travel, or casual wear. With practical pocket placement and a clean finish, it delivers both utility and a refined everyday look.";

    await prisma.product.update({
      where: { slug: navySlug },
      data: { description: navyDesc }
    });
    console.log('Navy Guard description updated.');

    process.exit(0);
  } catch (err) {
    console.error('Update Failed:', err);
    process.exit(1);
  }
}

updateDescriptions();
