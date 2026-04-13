"use client";

import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/cart";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResultadoContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const status = searchParams.get("status");
  const orderId = searchParams.get("id");

  useEffect(() => {
    if (status === "success") {
      clearCart(); // Clean cart on success
    }

    if (orderId) {
      // In a real app we would fetch order data from an API
      // For now we'll just show the status
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, orderId, clearCart]);

  if (loading) return (
    <div className="max-w-[1140px] mx-auto px-4 py-20 text-center">
      <div className="animate-spin inline-block w-8 h-8 border-4 border-[#53B94A] border-t-transparent rounded-full mb-4"></div>
      <p>Procesando información...</p>
    </div>
  );

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-20 text-center">
      {status === "success" ? (
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-[#F3F8F3] text-[#53B94A] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#54595F" }}>¡Pago Exitoso!</h1>
          <p className="text-[#7A7A7A] mb-8">
            Gracias por tu compra. Tu pedido <span className="font-bold text-[#54595F]">#{orderId}</span> ha sido recibido y estamos procesándolo.
          </p>
          <div className="bg-white border border-[#e0e0e0] rounded-xl p-6 mb-8 text-left">
            <h2 className="font-bold mb-4 text-sm uppercase tracking-wider text-[#7A7A7A]">Detalles del pedido</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Orden de compra:</span>
                <span className="font-semibold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Estado:</span>
                <span className="text-[#53B94A] font-bold">Pagado / Aprobado</span>
              </div>
            </div>
          </div>
          <Link href="/bombas" className="inline-block px-8 py-3 bg-[#53B94A] text-white font-bold rounded-lg shadow-sm hover:opacity-90">
            Seguir comprando
          </Link>
        </div>
      ) : status === "cancelled" ? (
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#54595F" }}>Pago Cancelado</h1>
          <p className="text-[#7A7A7A] mb-8">Has cancelado la transacción en Webpay. No se realizó ningún cargo.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout" className="px-8 py-3 bg-[#53B94A] text-white font-bold rounded-lg shadow-sm">Reintentar pago</Link>
            <Link href="/carrito" className="px-8 py-3 border border-[#e0e0e0] text-[#54595F] font-bold rounded-lg hover:bg-gray-50">Volver al carrito</Link>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#54595F" }}>Error en el proceso</h1>
          <p className="text-[#7A7A7A] mb-8">No pudimos procesar tu pago. Puede que haya un problema con tu tarjeta o con la conexión a Transbank.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout" className="px-8 py-3 bg-[#53B94A] text-white font-bold rounded-lg shadow-sm">Reintentar pago</Link>
            <Link href="/" className="px-8 py-3 border border-[#e0e0e0] text-[#54595F] font-bold rounded-lg hover:bg-gray-50">Ir al inicio</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultadoPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ResultadoContent />
    </Suspense>
  );
}
