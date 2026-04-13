export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { saveQuote } from "@/lib/quotes";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, empresa, email, telefono, mensaje, productos } = body;
    if (!nombre || !email || !telefono) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }
    const quote = saveQuote({ nombre, empresa, email, telefono, mensaje, productos: productos || [] });
    return NextResponse.json({ ok: true, id: quote.id });
  } catch (err) {
    console.error("Error saving quote:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
