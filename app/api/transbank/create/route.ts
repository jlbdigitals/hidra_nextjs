import { NextResponse } from "next/server";
import { webpayPlus, TBK_RETURN_URL } from "@/lib/transbank";
import { saveOrder } from "@/lib/orders";

export async function POST(request: Request) {
  try {
    const { customer, items, total } = await request.json();

    if (!customer || !items || !total) {
      return NextResponse.json({ error: "Datos faltantes" }, { status: 400 });
    }

    // 1. Persist the order in our system as "initialized"
    const order = saveOrder({
      nombre: customer.nombre,
      empresa: customer.empresa,
      rutEmpresa: customer.rutEmpresa,
      email: customer.email,
      telefono: customer.telefono,
      direccion: customer.direccion,
      comuna: customer.comuna,
      region: customer.region,
      total: total,
      items: items,
      sessionId: `S${Date.now()}`
    });

    // 2. Start Transbank transaction
    // buildOrder: id we use for Transbank communication
    const response = await webpayPlus.create(
      order.buyOrder,
      order.sessionId,
      total,
      TBK_RETURN_URL
    );

    return NextResponse.json({
      token: response.token,
      url: response.url,
      buyOrder: order.buyOrder
    });

  } catch (error: any) {
    console.error("TRANSBANK CREATE ERROR:", error);
    return NextResponse.json({ error: error.message || "Error al crear transacción" }, { status: 500 });
  }
}
