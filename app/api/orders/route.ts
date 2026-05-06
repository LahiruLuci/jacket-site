import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      customerName, 
      customerEmail, 
      customerPhone, 
      customerAddress, 
      items 
    } = body;

    // 1. REJECT EMPTY CART & VALIDATE CUSTOMER DATA
    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, message: "Your cart is empty" }, { status: 400 });
    }

    if (!customerName?.trim() || !customerEmail?.trim() || !customerPhone?.trim() || !customerAddress?.trim()) {
      return NextResponse.json({ success: false, message: "All customer fields are required" }, { status: 400 });
    }

    // 2. SERVER-SIDE TOTAL RECALCULATION (SECURITY)
    // Fetch latest prices from DB to prevent frontend price manipulation
    const productIds = items.map((item: any) => item.productId).filter(Boolean);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    let serverCalculatedTotal = 0;
    const orderItemsData = items.map((item: any) => {
      const dbProduct = dbProducts.find(p => p.id === item.productId);
      
      if (!dbProduct) {
        throw new Error(`Product not found: ${item.productName}`);
      }

      const unitPrice = dbProduct.price;
      const lineTotal = unitPrice * item.quantity;
      serverCalculatedTotal += lineTotal;

      return {
        productId: item.productId,
        productName: dbProduct.name,
        productSlug: dbProduct.slug,
        productImage: dbProduct.images[0] || "/assets/placeholder.webp",
        size: item.size,
        quantity: item.quantity,
        unitPrice: unitPrice,
        lineTotal: lineTotal,
      };
    });

    // 3. ATOMIC TRANSACTION: CREATE ORDER + UPDATE STOCK
    const order = await prisma.$transaction(async (tx) => {
      // Create the Order
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerEmail,
          customerPhone,
          customerAddress,
          totalAmount: serverCalculatedTotal,
          status: "PENDING", // Unified uppercase as requested
          items: {
            create: orderItemsData
          }
        }
      });

      // Update stock levels
      for (const item of items) {
        if (item.productId) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity
              }
            }
          });
        }
      }

      return newOrder;
    });

    // 4. RETURN SUCCESS RESPONSE
    return NextResponse.json({ 
      success: true, 
      message: "Order placed successfully", 
      orderId: order.id 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ 
      success: false,
      message: error.message || "An error occurred while processing your order.",
    }, { status: 500 });
  }
}
