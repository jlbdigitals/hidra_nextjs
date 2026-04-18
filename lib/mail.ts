import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE, // e.g., 'gmail'
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  // If SMTP is not configured, we just log to console (useful for dev)
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log("------------------------------------------");
    console.log(`SIMULATED EMAIL TO: ${to}`);
    console.log(`SUBJECT: ${subject}`);
    console.log("HTML CONTENT OMITTED FROM CONSOLE LOG");
    console.log("------------------------------------------");
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Hidra Equipos" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export function generateQuoteEmailHtml(quote: any, isAdmin: boolean) {
  const title = isAdmin ? "Nueva Cotización Recibida" : "Hemos recibido tu solicitud de cotización";
  const intro = isAdmin 
    ? `Has recibido una nueva cotización de ${quote.nombre}.`
    : `Hola ${quote.nombre}, gracias por contactarnos. Hemos recibido tu solicitud y te responderemos a la brevedad.`;

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #53B94A; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Hidra Equipos</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #54595F; margin-top: 0;">${title}</h2>
        <p style="color: #7A7A7A; line-height: 1.6;">${intro}</p>
        
        <div style="background-color: #F3F8F3; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #53B94A; font-size: 16px; border-bottom: 1px solid #d0d0d0; padding-bottom: 8px;">Detalles del contacto</h3>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Nombre:</strong> ${quote.nombre}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${quote.email}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Teléfono:</strong> ${quote.telefono}</p>
          ${quote.empresa ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Empresa:</strong> ${quote.empresa}</p>` : ""}
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #54595F; font-size: 16px;">Mensaje / Requerimiento:</h3>
          <p style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border: 1px solid #e1e3e5; font-size: 14px; white-space: pre-wrap;">${quote.mensaje}</p>
        </div>

        ${quote.productos && quote.productos.length > 0 ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #54595F; font-size: 16px;">Productos:</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background-color: #f9fafb;">
                  <th style="border: 1px solid #e1e3e5; padding: 10px; text-align: left;">Producto</th>
                  <th style="border: 1px solid #e1e3e5; padding: 10px; text-align: center; width: 60px;">Cant.</th>
                </tr>
              </thead>
              <tbody>
                ${quote.productos.map((p: any) => `
                  <tr>
                    <td style="border: 1px solid #e1e3e5; padding: 10px;">${p.nombre}</td>
                    <td style="border: 1px solid #e1e3e5; padding: 10px; text-align: center;">${p.cantidad}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        ` : ""}

        <p style="color: #7A7A7A; font-size: 12px; text-align: center; margin-top: 40px;">
          Este es un mensaje automático enviado desde hidra.cl
        </p>
      </div>
    </div>
  `;
}

export function generateOrderEmailHtml(order: any, isAdmin: boolean) {
  const title = isAdmin ? `Nueva Venta: ${order.buyOrder}` : `Tu pedido ${order.buyOrder} ha sido confirmado`;
  const intro = isAdmin 
    ? `Se ha procesado una nueva venta exitosa a través de Transbank.`
    : `Hola ${order.nombre}, tu pago ha sido procesado exitosamente. A continuación detallamos tu pedido.`;

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #53B94A; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Hidra Equipos</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #54595F; margin-top: 0;">${title}</h2>
        <p style="color: #7A7A7A; line-height: 1.6;">${intro}</p>
        
        <div style="background-color: #F3F8F3; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #53B94A; font-size: 16px;">Datos de despacho</h3>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Cliente:</strong> ${order.nombre}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Dirección:</strong> ${order.direccion}, ${order.comuna}, ${order.region}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Teléfono:</strong> ${order.telefono}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #54595F; font-size: 16px;">Detalle del Pedido:</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background-color: #f9fafb;">
                <th style="border: 1px solid #e1e3e5; padding: 10px; text-align: left;">Producto</th>
                <th style="border: 1px solid #e1e3e5; padding: 10px; text-align: center;">Cant.</th>
                <th style="border: 1px solid #e1e3e5; padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map((p: any) => `
                <tr>
                  <td style="border: 1px solid #e1e3e5; padding: 10px;">${p.nombre}</td>
                  <td style="border: 1px solid #e1e3e5; padding: 10px; text-align: center;">${p.cantidad}</td>
                  <td style="border: 1px solid #e1e3e5; padding: 10px; text-align: right;">$${(p.precio * p.cantidad).toLocaleString("es-CL")}</td>
                </tr>
              `).join("")}
              <tr>
                <td colspan="2" style="border: 1px solid #e1e3e5; padding: 10px; text-align: right; font-weight: bold;">TOTAL PAGADO</td>
                <td style="border: 1px solid #e1e3e5; padding: 10px; text-align: right; font-weight: bold; color: #53B94A;">$${order.total.toLocaleString("es-CL")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style="color: #7A7A7A; font-size: 12px; text-align: center; margin-top: 40px;">
          Este es un mensaje automático enviado desde hidra.cl
        </p>
      </div>
    </div>
  `;
}
