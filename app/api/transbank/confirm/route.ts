import { NextResponse } from "next/server";
import { webpayPlus } from "@/lib/transbank";
import { getOrderByBuyOrder, updateOrder } from "@/lib/orders";

export async function GET(request: Request) {
  return handleConfirmation(request);
}

export async function POST(request: Request) {
  return handleConfirmation(request);
}

async function handleConfirmation(request: Request) {
  const url = new URL(request.url);
  
  // Transbank signals
  let token = url.searchParams.get("token_ws");
  const tbkToken = url.searchParams.get("TBK_TOKEN");
  const tbkSession = url.searchParams.get("TBK_ID_SESION");
  const tbkOrder = url.searchParams.get("TBK_ORDEN_COMPRA");

  // If we came from a POST form, we might need to parse body
  if (request.method === "POST" && !token && !tbkToken) {
    try {
      const formData = await request.formData();
      token = formData.get("token_ws") as string;
    } catch (e) {
      console.error("Error parsing form data", e);
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3002";

  // Case 1: Payment cancelled by user
  if (tbkToken) {
    const order = getOrderByBuyOrder(tbkOrder || "");
    if (order) updateOrder(order.id, { estado: "anulada" });
    return NextResponse.redirect(`${baseUrl}/checkout/resultado?status=cancelled`);
  }

  // Case 2: Error or Timeout
  if (!token) {
    return NextResponse.redirect(`${baseUrl}/checkout/resultado?status=error`);
  }

  try {
    // 3. Commit the transaction (Confirm with Transbank)
    const result = await webpayPlus.commit(token);

    // Find our order
    const order = getOrderByBuyOrder(result.buy_order);
    if (!order) {
      return NextResponse.redirect(`${baseUrl}/checkout/resultado?status=error&msg=OrderNotFound`);
    }

    if (result.status === "AUTHORIZED" && result.response_code === 0) {
      // SUCCESS
      updateOrder(order.id, {
        estado: "autorizada",
        token: token,
        paymentData: result
      });
      return NextResponse.redirect(`${baseUrl}/checkout/resultado?status=success&id=${order.id}`);
    } else {
      // REJECTED
      updateOrder(order.id, {
        estado: "fallida",
        token: token,
        paymentData: result
      });
      return NextResponse.redirect(`${baseUrl}/checkout/resultado?status=failed&id=${order.id}`);
    }

  } catch (error: any) {
    console.error("TRANSBANK COMMIT ERROR:", error);
    return NextResponse.redirect(`${baseUrl}/checkout/resultado?status=error&msg=${encodeURIComponent(error.message)}`);
  }
}
