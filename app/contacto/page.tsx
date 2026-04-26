import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto — Hidra",
  description: "Contáctenos para consultas, cotizaciones y soporte técnico.",
};

export default function ContactoPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#0f172a] py-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-br from-[#006e0c] to-transparent blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-tl from-[#4059aa] to-transparent blur-[120px]" />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10 text-center">
          <span className="inline-block text-[10px] font-extrabold text-[#006e0c] uppercase tracking-[0.4em] mb-6 animate-fade-in">Mantenemos el flujo</span>
          <h1
            className="text-5xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Estamos a un <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#53B94A] to-[#4059aa]">click de distancia</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium" style={{ fontFamily: "var(--font-manrope)" }}>
            Nuestro equipo de expertos está listo para asesorarte en tus proyectos hidráulicos y agrícolas.
          </p>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="relative z-20 -mt-12 mb-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <div className="bg-white p-8 rounded-[32px] shadow-[0px_20px_50px_rgba(0,0,0,0.05)] border border-[#f1f5f9] transition-all hover:-translate-y-2 hover:shadow-[0px_40px_80px_rgba(0,0,0,0.1)] group">
              <div className="w-14 h-14 rounded-2xl bg-[#006e0c]/5 flex items-center justify-center mb-6 text-[#006e0c] group-hover:bg-[#006e0c] group-hover:text-white transition-all duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#94a3b8] mb-2">Llámanos</p>
              <div className="space-y-1">
                <p className="text-lg font-extrabold text-[#1e293b]" style={{ fontFamily: "var(--font-manrope)" }}>2 2723 8788</p>
                <p className="text-base font-bold text-[#64748b]" style={{ fontFamily: "var(--font-manrope)" }}>+56 9 9710 7845</p>
              </div>
            </div>

            {/* Email Card */}
            <a href="mailto:contacto@hidra.cl" className="bg-white p-8 rounded-[32px] shadow-[0px_20px_50px_rgba(0,0,0,0.05)] border border-[#f1f5f9] transition-all hover:-translate-y-2 hover:shadow-[0px_40px_80px_rgba(0,0,0,0.1)] group">
              <div className="w-14 h-14 rounded-2xl bg-[#4059aa]/5 flex items-center justify-center mb-6 text-[#4059aa] group-hover:bg-[#4059aa] group-hover:text-white transition-all duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#94a3b8] mb-2">Escríbenos</p>
              <p className="text-lg font-extrabold text-[#1e293b]" style={{ fontFamily: "var(--font-manrope)" }}>contacto@hidra.cl</p>
            </a>

            {/* Location Card */}
            <div className="bg-white p-8 rounded-[32px] shadow-[0px_20px_50px_rgba(0,0,0,0.05)] border border-[#f1f5f9] transition-all hover:-translate-y-2 hover:shadow-[0px_40px_80px_rgba(0,0,0,0.1)] group">
              <div className="w-14 h-14 rounded-2xl bg-[#006e0c]/5 flex items-center justify-center mb-6 text-[#006e0c] group-hover:bg-[#006e0c] group-hover:text-white transition-all duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#94a3b8] mb-2">Visítanos</p>
              <p className="text-lg font-extrabold text-[#1e293b]" style={{ fontFamily: "var(--font-manrope)" }}>Maipú, RM, Chile</p>
            </div>

            {/* Hours Card */}
            <div className="bg-white p-8 rounded-[32px] shadow-[0px_20px_50px_rgba(0,0,0,0.05)] border border-[#f1f5f9] transition-all hover:-translate-y-2 hover:shadow-[0px_40px_80px_rgba(0,0,0,0.1)] group">
              <div className="w-14 h-14 rounded-2xl bg-[#4059aa]/5 flex items-center justify-center mb-6 text-[#4059aa] group-hover:bg-[#4059aa] group-hover:text-white transition-all duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#94a3b8] mb-2">Horario</p>
              <div className="space-y-1">
                <p className="text-lg font-extrabold text-[#1e293b]" style={{ fontFamily: "var(--font-manrope)" }}>Lun-Vie 9:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Form Side */}
          <div className="lg:w-3/5">
            <div className="max-w-xl">
              <span className="text-[11px] font-extrabold text-[#006e0c] uppercase tracking-[0.3em] mb-4 block">Formulario de contacto</span>
              <h2 className="text-4xl font-extrabold text-[#1e293b] mb-10 tracking-tight" style={{ fontFamily: "var(--font-manrope)" }}>Cuéntanos qué necesitas</h2>
              <ContactForm />
            </div>
          </div>

          {/* Info Side */}
          <div className="lg:w-2/5 flex flex-col gap-10">
            {/* WhatsApp Premium */}
            <a
              href="https://wa.me/56997107845"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden p-8 rounded-[32px] bg-[#25D366] text-white flex items-center gap-6 shadow-[0px_20px_40px_rgba(37,211,102,0.2)] transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#25D366] relative z-10 shadow-lg">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1 text-white/70">Respuesta inmediata</p>
                <p className="text-xl font-extrabold" style={{ fontFamily: "var(--font-manrope)" }}>Chat vía WhatsApp</p>
              </div>
            </a>

            {/* Service Pillars */}
            <div className="bg-[#f8fafc] p-10 rounded-[32px] border border-[#f1f5f9]">
              <h3 className="text-sm font-extrabold text-[#1e293b] uppercase tracking-widest mb-8">Soluciones integrales</h3>
              <ul className="space-y-6">
                {[
                  { label: "Cotizaciones precisas", color: "#006e0c" },
                  { label: "Asesoría técnica experta", color: "#4059aa" },
                  { label: "Servicio de instalación", color: "#006e0c" },
                  { label: "Soporte postventa real", color: "#4059aa" },
                  { label: "Consultas de stock", color: "#006e0c" },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-4 group">
                    <div className="w-2 h-2 rounded-full transition-transform group-hover:scale-150" style={{ backgroundColor: item.color }} />
                    <span className="text-base font-bold text-[#64748b] group-hover:text-[#1e293b] transition-colors" style={{ fontFamily: "var(--font-manrope)" }}>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
