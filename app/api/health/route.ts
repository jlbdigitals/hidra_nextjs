import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  const db = getDb();

  if (!db) {
    return NextResponse.json(
      { ok: false, error: "DATABASE_URL no configurada" },
      { status: 503 }
    );
  }

  try {
    const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(products);
    return NextResponse.json({ ok: true, products: Number(count) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: String(e) },
      { status: 503 }
    );
  }
}
