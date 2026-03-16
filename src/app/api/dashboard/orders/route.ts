import { NextResponse } from "next/server";
import { getAllOrders } from "@/lib/store";
import { corsHeaders } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const orders = await getAllOrders();

  return NextResponse.json(
    {
      success: true,
      data: orders,
      meta: { total: orders.length, timestamp: new Date().toISOString() },
    },
    { headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
