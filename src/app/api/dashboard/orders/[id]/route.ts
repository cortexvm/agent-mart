import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus, getOrder } from "@/lib/store";
import { corsHeaders } from "@/lib/utils";
import { Order } from "@/lib/types";

export const dynamic = "force-dynamic";

const validStatuses: Order["status"][] = ["confirmed", "processing", "shipped", "delivered"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { status } = body;

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`, meta: { timestamp: new Date().toISOString() } },
        { status: 400, headers: corsHeaders }
      );
    }

    const updated = await updateOrderStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Order "${id}" not found`, meta: { timestamp: new Date().toISOString() } },
        { status: 404, headers: corsHeaders }
      );
    }

    const order = await getOrder(id);
    return NextResponse.json(
      { success: true, data: order, meta: { timestamp: new Date().toISOString() } },
      { headers: corsHeaders }
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
