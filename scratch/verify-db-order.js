const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testOrder() {
  try {
    console.log("Testing DB Connection...");
    const products = await prisma.product.findMany({ take: 1 });
    if (products.length === 0) {
      console.log("No products found to test with.");
      return;
    }

    const testProduct = products[0];
    console.log(`Using product: ${testProduct.name} (${testProduct.id})`);

    const order = await prisma.order.create({
      data: {
        customerName: "Automated Test",
        customerEmail: "test@automated.com",
        customerPhone: "0000000000",
        customerAddress: "123 Test Bot Lane",
        totalAmount: testProduct.price,
        status: "PENDING",
        items: {
          create: [
            {
              productId: testProduct.id,
              productName: testProduct.name,
              productSlug: testProduct.slug,
              productImage: testProduct.images[0] || "",
              size: "M",
              quantity: 1,
              unitPrice: testProduct.price,
              lineTotal: testProduct.price
            }
          ]
        }
      }
    });

    console.log("SUCCESS: Order created with ID:", order.id);
    
    // Cleanup
    await prisma.orderItem.deleteMany({ where: { orderId: order.id } });
    await prisma.order.delete({ where: { id: order.id } });
    console.log("Cleanup complete.");

  } catch (err) {
    console.error("DB TEST FAILED:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testOrder();
