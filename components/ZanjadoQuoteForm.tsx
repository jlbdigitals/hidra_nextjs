"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ZanjadoQuoteForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    metros: "",
    comuna: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          mensaje: `COTIZACIÓN ZANJADO\nMetros: ${form.metros}\nComuna: ${form.comuna}\nMensaje: ${form.mensaje}`,
          productos: [{ id: 0, nombre: "Servicio de Zanjado", cantidad: parseInt(form.metros) || 0 }]
        }),
      });

      if (res.ok) {
        router.push("/gracias-cotizar");
      } else {
        alert("Error al enviar la solicitud. Intente nuevamente.");
      }
    } catch {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-4 text-center bg-white rounded-lg border border-[#53B94A] p-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#53B94A]">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#54595F]">¡Solicitud enviada!</h3>
        <p className="text-[#7A7A7A]">Hemos recibido su requerimiento de zanjado. Nos contactaremos con usted a la brevedad.</p>
      </div>
    );
  }

  const inputClass = "w-full border border-[#e0e0e0] rounded px-4 py-2.5 text-sm text-[#54595F] bg-white placeholder-[#aaa] focus:outline-none focus:border-[#53B94A] transition-colors";

  return (
    <div id="formulario-zanjado" className="bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden">
      <div className="bg-[#53B94A] px-6 py-4">
        <h3 className="text-white font-bold text-lg">Cotizar Servicio de Zanjado</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1">Nombre Completo *</label>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Ej: Juan Pérez" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1">Teléfono de contacto *</label>
            <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required placeholder="+56 9 XXXX XXXX" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="correo@ejemplo.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1">Comuna del servicio *</label>
            <input type="text" name="comuna" value={form.comuna} onChange={handleChange} required placeholder="Ej: Maipú" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1">Metros Lineales Estimados</label>
          <input type="number" name="metros" value={form.metros} onChange={handleChange} placeholder="Ej: 150" className={inputClass} />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1">Detalles del terreno o proyecto</label>
          <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={4} placeholder="Cuéntenos más sobre su requerimiento..." className={inputClass} style={{ resize: "none" }} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded font-bold text-white transition-all hover:opacity-90 disabled:opacity-60 shadow-md uppercase tracking-wider"
          style={{ backgroundColor: "#53B94A" }}
        >
          {loading ? "Enviando Solicitud..." : "Solicitar Presupuesto"}
        </button>
      </form>
    </div>
  );
}
