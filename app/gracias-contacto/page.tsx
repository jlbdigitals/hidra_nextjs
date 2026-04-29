import Link from "next/link";

export default function GraciasContactoPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-32 bg-white">
      <div className="max-w-[600px] w-full mx-auto px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-[#006e0c]/10 flex items-center justify-center mx-auto mb-10 text-[#006e0c] shadow-2xl shadow-[#006e0c]/10">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-[#1e293b] mb-4 tracking-tight" style={{ fontFamily: "var(--font-manrope)" }}>
          ¡Mensaje enviado con éxito!
        </h1>
        <p className="text-lg text-slate-500 font-medium mb-12">
          Recibimos tu consulta. Nuestro equipo técnico te responderá a la brevedad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/productos" 
            className="px-10 py-5 bg-[#1e293b] text-white font-extrabold rounded-2xl shadow-xl shadow-black/10 hover:bg-black transition-all"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Ver Catálogo
          </Link>
          <Link 
            href="/" 
            className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-400 font-extrabold rounded-2xl hover:border-[#4059aa] hover:text-[#4059aa] transition-all"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Ir al Inicio
          </Link>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-400">
            ¿Urgente? Llámanos al{" "}
            <a href="tel:+56997107845" className="text-[#006e0c] font-extrabold hover:underline">+56 9 9710 7845</a>
          </p>
        </div>
      </div>
    </div>
  );
}