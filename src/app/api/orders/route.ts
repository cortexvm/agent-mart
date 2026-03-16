import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/data/products";
import { createOrder } from "@/lib/store";
import { corsHeaders, generateOrderId, getEstimatedDelivery } from "@/lib/utils";
import { Order, OrderItem } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, agentId } = body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "items must be a non-empty array", meta: { timestamp: new Date().toISOString() } },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate customer
    if (!customer || !customer.name || !customer.address || !customer.city || !customer.country) {
      return NextResponse.json(
        { success: false, error: "customer must include name, address, city, and country", meta: { timestamp: new Date().toISOString() } },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!customer.email && !customer.phone) {
      return NextResponse.json(
        { success: false, error: "customer must include either email or phone", meta: { timestamp: new Date().toISOString() } },
        { status: 400, headers: corsHeaders }
      );
    }

    // Build order items and calculate total
    const orderItems: OrderItem[] = [];
    let totalAmount = 0;

    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity < 1) {
        return NextResponse.json(
          { success: false, error: `Invalid item: productId and quantity (>= 1) are required`, meta: { timestamp: new Date().toISOString() } },
          { status: 400, headers: corsHeaders }
        );
      }

      const product = getProductById(item.productId);
      if (!product) {
        return NextResponse.json(
          { success: false, error: `Product "${item.productId}" not found`, meta: { timestamp: new Date().toISOString() } },
          { status: 404, headers: corsHeaders }
        );
      }

      if (!product.inStock) {
        return NextResponse.json(
          { success: false, error: `Product "${product.name}" is out of stock`, meta: { timestamp: new Date().toISOString() } },
          { status: 400, headers: corsHeaders }
        );
      }

      const orderItem: OrderItem = {
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
      };
      orderItems.push(orderItem);
      totalAmount += product.price * item.quantity;
    }

    const order: Order = {
      id: generateOrderId(),
      items: orderItems,
      totalAmount: Math.round(totalAmount * 100) / 100,
      currency: "USD",
      paymentMethod: "COD",
      status: "confirmed",
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        country: customer.country,
      },
      createdAt: new Date().toISOString(),
      estimatedDelivery: getEstimatedDelivery(),
      agentId: agentId || undefined,
    };

    const created = createOrder(order);

    return NextResponse.json(
      {
        success: true,
        data: created,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 201, headers: corsHeaders }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body", meta: { timestamp: new Date().toISOString() } },
      { status: 400, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
