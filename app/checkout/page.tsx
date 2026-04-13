"use client";

import { useCart } from "@/components/CartContext";
import { formatPrice, getCartSubtotal } from "@/lib/cart";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { REGIONES_CHILE } from "@/lib/constants";

export default function CheckoutPage() {
  const { items, ventaCount } = useCart();
  const router = useRouter();
  const subtotalVenta = getCartSubtotal({ items });
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    rutEmpresa: "",
    email: "",
    telefono: "",
    direccion: "",
    comuna: "",
    region: "",
  });

  if (ventaCount === 0) {
    return (
      <div className="max-w-[1140px] mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">No hay productos para compra</h1>
        <p className="mb-6">Tu carrito no contiene productos con precio para venta directa.</p>
        <Link href="/catalogo" className="px-6 py-3 bg-[#53B94A] text-white font-bold rounded">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/transbank/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: items.filter(i => i.tipo === "venta"),
          total: subtotalVenta
        }),
      });

      const data = await res.json();
      if (data.url && data.token) {
        // Redirect to Transbank
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.url;
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'token_ws';
        input.value = data.token;
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
      } else {
        alert("Error al iniciar el pago: " + (data.error || "Intente nuevamente"));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-[#7A7A7A] mb-6">
        <Link href="/carrito" className="hover:text-[#53B94A]">Carrito</Link>
        <span>/</span>
        <span className="font-bold text-[#54595F]">Finalizar compra</span>
      </div>

      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}>
        Finalizar compra
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#e0e0e0] shadow-sm">
              <h2 className="text-lg font-bold mb-6 pb-2 border-b border-[#f0f0f0]" style={{ color: "#54595F" }}>
                Datos de facturación y envío
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1.5">Nombre completo</label>
                  <input required name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border border-[#e0e0e0] rounded px-4 py-2.5 text-sm focus:border-[#53B94A] outline-none" placeholder="Ej: Juan Pérez" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1.5">Empresa (Opcional)</label>
                  <input name="empresa" value={formData.empresa} onChange={handleChange} className="w-full border border-[#e0e0e0] rounded px-4 py-2.5 text-sm focus:border-[#53B94A] outline-none" placeholder="Nombre de la empresa" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1.5">RUT Empresa (Opcional)</label>
                  <input name="rutEmpresa" value={formData.rutEmpresa} onChange={handleChange} className="w-full border border-[#e0e0e0] rounded px-4 py-2.5 text-sm focus:border-[#53B94A] outline-none" placeholder="Ej: 76.123.456-7" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1.5">Correo electrónico</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-[#e0e0e0] rounded px-4 py-2.5 text-sm focus:border-[#53B94A] outline-none" placeholder="juan@correo.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1.5">Teléfono</label>
                  <input required name="telefono" value={formData.telefono} onChange={handleChange} className="w-full border border-[#e0e0e0] rounded px-4 py-2.5 text-sm focus:border-[#53B94A] outline-none" placeholder="+569 1234 5678" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1.5">Dirección</label>
                  <input required name="direccion" value={formData.direccion} onChange={handleChange} className="w-full border border-[#e0e0e0] rounded px-4 py-2.5 text-sm focus:border-[#53B94A] outline-none" placeholder="Calle, número, departamento" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1.5">Comuna</label>
                  <input required name="comuna" value={formData.comuna} onChange={handleChange} className="w-full border border-[#e0e0e0] rounded px-4 py-2.5 text-sm focus:border-[#53B94A] outline-none" placeholder="Ej: Santiago" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1.5">Región</label>
                  <select 
                    required 
                    name="region" 
                    value={formData.region} 
                    onChange={(e: any) => setFormData({ ...formData, region: e.target.value })} 
                    className="w-full border border-[#e0e0e0] rounded px-4 py-2.5 text-sm focus:border-[#53B94A] outline-none bg-white"
                  >
                    <option value="">Seleccione región</option>
                    {REGIONES_CHILE.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#e0e0e0] shadow-sm">
              <h2 className="text-lg font-bold mb-4" style={{ color: "#54595F" }}>
                Método de pago
              </h2>
              <div className="flex items-center gap-4 p-4 border-2 border-[#53B94A] bg-[#F3F8F3] rounded-lg">
                <input type="radio" checked readOnly className="accent-[#53B94A] w-4 h-4" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Webpay Plus</span>
                  <span className="text-xs text-[#7A7A7A]">Tarjetas de crédito, débito y prepago.</span>
                </div>
                <img src="https://www.transbank.cl/public/images/webpay-plus.png" alt="Webpay" className="h-6 ml-auto" />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 text-white font-bold rounded-lg text-lg transition-all shadow-md ${loading ? 'bg-[#7A7A7A] cursor-not-allowed' : 'bg-[#53B94A] hover:bg-[#46a13e]'}`}
            >
              {loading ? "Procesando..." : "Realizar pago"}
            </button>
          </form>
        </div>

        {/* Sidebar Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-[#F4F7F3] rounded-xl p-8 border border-[#e0e0e0] sticky top-24">
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}>
              Resumen de compra
            </h2>
            
            <div className="space-y-4 mb-6">
              {items.filter(i => i.tipo === "venta").map(item => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight text-[#54595F]">{item.nombre}</p>
                    <p className="text-xs text-[#7A7A7A]">Cant: {item.cantidad}</p>
                  </div>
                  <span className="text-sm font-bold text-[#53B94A]">{formatPrice(item.precio * item.cantidad)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#e0e0e0] pt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#7A7A7A]">Neto</span>
                <span className="font-medium">{formatPrice(subtotalVenta / 1.19)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#7A7A7A]">IVA (19%)</span>
                <span className="font-medium">{formatPrice(subtotalVenta - (subtotalVenta / 1.19))}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#e0e0e0]">
                <span className="text-lg font-bold text-[#54595F]">Total</span>
                <span className="text-2xl font-bold" style={{ color: "#53B94A" }}>{formatPrice(subtotalVenta)}</span>
              </div>
            </div>
            
            <p className="text-[10px] text-[#7A7A7A] mt-6 leading-relaxed">
              Al confirmar la compra, aceptas nuestros términos y condiciones. La transacción se procesará de forma segura a través de Transbank.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
