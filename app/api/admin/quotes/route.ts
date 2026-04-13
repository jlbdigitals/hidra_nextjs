export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getQuotes, updateQuoteStatus, type Quote } from "@/lib/quotes";

export async function GET() {
  const quotes = getQuotes();
  return NextResponse.json(quotes);
}

export async function PATCH(req: NextRequest) {
  const { id, estado } = await req.json() as { id: string; estado: Quote["estado"] };
  const ok = updateQuoteStatus(id, estado);
  return NextResponse.json({ ok });
}
