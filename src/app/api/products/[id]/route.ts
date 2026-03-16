import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/data/products";
import { corsHeaders } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return NextResponse.json(
      {
        success: false,
        error: `Product with id "${id}" not found`,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: product,
      meta: { timestamp: new Date().toISOString() },
    },
    { headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
