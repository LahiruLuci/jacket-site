const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log(`Found ${products.length} products.`);

  for (const product of products) {
    let newName = product.name;
    let newSubtitle = "";

    if (product.name.includes("Shadow Guard")) {
      newName = "Shadow Guard";
      newSubtitle = "All-Weather Jacket";
    } else if (product.name.includes("Navy Guard")) {
      newName = "Navy Guard";
      newSubtitle = "Utility Jacket";
    } else if (product.name.includes("Vanguard Titan")) {
      newName = "Vanguard Titan";
      newSubtitle = "Racing Grade";
    } else if (product.name.includes("Stealth Commuter")) {
      newName = "Stealth Commuter";
      newSubtitle = "City Shell";
    } else if (product.name.includes("Apex Kinetic")) {
      newName = "Apex Kinetic";
      newSubtitle = "Kinetic Armor";
    } else if (product.name.includes("Heritage Cafe")) {
      newName = "Heritage Cafe";
      newSubtitle = "Classic Leather";
    } else if (product.name.includes("Velocity Air")) {
      newName = "Velocity Air";
      newSubtitle = "Mesh Performance";
    } else if (product.name.includes("Nomad Gore-Tex")) {
      newName = "Nomad Gore-Tex";
      newSubtitle = "All-Terrain Pro";
    }

    if (newName !== product.name || newSubtitle) {
      console.log(`Updating ${product.name} -> ${newName} (${newSubtitle})`);
      await prisma.product.update({
        where: { id: product.id },
        data: {
          name: newName,
          subtitle: newSubtitle
        }
      });
    }
  }

  console.log("Update complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
