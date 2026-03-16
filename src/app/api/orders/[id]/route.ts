import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/store";
import { corsHeaders } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return NextResponse.json(
      {
        success: false,
        error: `Order "${id}" not found.`,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: order,
      meta: { timestamp: new Date().toISOString() },
    },
    { headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
