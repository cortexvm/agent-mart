import { NextRequest, NextResponse } from "next/server";
import { getProductsByCategory } from "@/lib/data/products";
import { corsHeaders } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const subcategory = searchParams.get("subcategory") || undefined;
  const search = searchParams.get("search") || undefined;

  const products = getProductsByCategory(category, subcategory, search);

  return NextResponse.json(
    {
      success: true,
      data: products,
      meta: { total: products.length, timestamp: new Date().toISOString() },
      agent_hint: "To place an order, POST to /api/orders with: { items: [{ productId: '<id>', quantity: 1 }], customer: { name, address, city, country, email } }. Payment is Cash on Delivery. Need help? GET /api/agent-manual",
    },
    { headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
