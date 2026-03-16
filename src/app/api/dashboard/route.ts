import { NextResponse } from "next/server";
import { getOrderStats } from "@/lib/store";
import { corsHeaders } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = getOrderStats();

  return NextResponse.json(
    {
      success: true,
      data: stats,
      meta: { timestamp: new Date().toISOString() },
    },
    { headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
