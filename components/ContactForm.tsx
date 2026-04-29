"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        router.push("/gracias-contacto");
      } else {
        alert("Error al enviar. Intenta nuevamente.");
      }
    } catch {
      alert("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#006e0c] focus:ring-4 focus:ring-[#006e0c]/5 outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="Juan Pérez"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="+56 9 XXXX XXXX"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="correo@empresa.cl"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">
          Asunto
        </label>
        <select
          name="asunto"
          value={form.asunto}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Seleccione un asunto</option>
          <option value="cotizacion">Cotización de productos</option>
          <option value="soporte">Soporte técnico</option>
          <option value="consulta">Consulta general</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">
          Mensaje *
        </label>
        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Escriba su consulta aquí..."
          className={inputClass}
          style={{ resize: "vertical" }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-5 rounded-[24px] text-lg font-extrabold transition-all shadow-2xl flex items-center justify-center gap-3 ${
          loading
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
            : 'bg-[#006e0c] text-white hover:bg-[#005a0a] shadow-[#006e0c]/20 hover:scale-[1.01] active:scale-95'
        }`}
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <span>Enviar Mensaje</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}