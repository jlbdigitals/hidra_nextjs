export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { saveQuote } from "@/lib/quotes";
import { sendEmail, generateQuoteEmailHtml } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, empresa, email, telefono, mensaje, productos } = body;
    if (!nombre || !email || !telefono) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }
    const quote = saveQuote({ nombre, empresa, email, telefono, mensaje, productos: productos || [] });

    // Send emails (background)
    const adminEmail = process.env.ADMIN_EMAIL || "contacto@hidra.cl";

    // 1. To Admin
    sendEmail({
      to: adminEmail,
      subject: `Nueva Cotización: ${nombre} (${quote.id})`,
      html: generateQuoteEmailHtml(quote, true)
    });

    // 2. To Customer
    sendEmail({
      to: email,
      subject: `Hemos recibido tu solicitud - Hidra Equipos`,
      html: generateQuoteEmailHtml(quote, false)
    });

    return NextResponse.json({ ok: true, id: quote.id });
  } catch (err) {
    console.error("Error saving quote:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
