export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

function generateContactEmailHtml(data: any, isAdmin: boolean) {
  const title = isAdmin ? "Nuevo Mensaje de Contacto" : "Hemos recibido tu mensaje";
  const intro = isAdmin
    ? `Nuevo mensaje de ${data.nombre} a través del formulario de contacto.`
    : `Hola ${data.nombre}, gracias por contactarnos.Hemos recibido tu mensaje y te responderemos a la brevedad.`;

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #006e0c; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Hidra Equipos</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #1e293b; margin-top: 0;">${title}</h2>
        <p style="color: #64748b; line-height: 1.6;">${intro}</p>
        
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #006e0c; font-size: 16px; border-bottom: 1px solid #d0d0d0; padding-bottom: 8px;">Datos del contacto</h3>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Nombre:</strong> ${data.nombre}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Teléfono:</strong> ${data.telefono || "No proporcionado"}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #1e293b; font-size: 16px;">Asunto: ${data.asunto || "No especificado"}</h3>
          <p style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border: 1px solid #e1e3e5; font-size: 14px; white-space: pre-wrap;">${data.mensaje}</p>
        </div>

        <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 40px;">
          Este es un mensaje automático enviado desde hidra.cl
        </p>
      </div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, asunto, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const data = { nombre, email, telefono, asunto, mensaje };
    const adminEmail = process.env.ADMIN_EMAIL || "contacto@hidra.cl";

    sendEmail({
      to: adminEmail,
      subject: `Nuevo contacto: ${nombre} - ${asunto || "Consulta"}`,
      html: generateContactEmailHtml(data, true),
    });

    sendEmail({
      to: email,
      subject: `Hemos recibido tu mensaje - Hidra Equipos`,
      html: generateContactEmailHtml(data, false),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error sending contact email:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}