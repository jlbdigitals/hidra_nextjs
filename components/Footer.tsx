import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-[1280px] mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
        {/* Logo + description */}
        <div className="lg:col-span-1 space-y-8">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <Image
              src="/images/logo.webp"
              alt="Hidra"
              width={180}
              height={57}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-sm font-medium text-slate-500 leading-relaxed" style={{ fontFamily: "var(--font-manrope)" }}>
            Líderes en ingeniería hidráulica integral. Suministramos equipos de alta precisión para bombeo, filtración y control de fluidos en los sectores industriales y agrícolas más exigentes de Chile.
          </p>
          <div className="flex flex-col gap-5 pt-4">
            <a href="tel:+56997107845" className="flex items-center gap-4 text-[#1e293b] hover:text-[#006e0c] font-extrabold transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 group-hover:bg-[#006e0c]/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-5 h-5 text-[#006e0c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-base font-extrabold" style={{ fontFamily: "var(--font-manrope)" }}>+56 9 9710 7845</span>
            </a>
            <a href="mailto:contacto@hidra.cl" className="flex items-center gap-4 text-[#1e293b] hover:text-[#4059aa] font-extrabold transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 group-hover:bg-[#4059aa]/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-5 h-5 text-[#4059aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-base font-extrabold" style={{ fontFamily: "var(--font-manrope)" }}>contacto@hidra.cl</span>
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[10px] font-extrabold text-[#4059aa] uppercase tracking-[0.4em] mb-10">Categorías de Equipos</h4>
          <ul className="space-y-5">
            {[
              { label: "Sistemas de Bombeo", href: "/bombas" },
              { label: "Tecnología de Filtración", href: "/catalogo/filtros" },
              { label: "Válvulas Industriales", href: "/catalogo/valvulas" },
              { label: "Riego de Precisión", href: "/catalogo/riego-agricola" },
              { label: "Paisajismo y Áreas Verdes", href: "/catalogo/riego-areas-verdes" },
              { label: "Tuberías de Alta Presión", href: "/catalogo/tuberias" },
              { label: "Automatización y Control", href: "/catalogo/control" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm font-bold text-slate-500 hover:text-[#006e0c] transition-all flex items-center gap-3 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-[#006e0c] group-hover:scale-150 transition-all"></span>
                  <span style={{ fontFamily: "var(--font-manrope)" }}>{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div>
          <h4 className="text-[10px] font-extrabold text-[#4059aa] uppercase tracking-[0.4em] mb-10">Marcas Representadas</h4>
          <ul className="grid grid-cols-1 gap-y-5">
            {["Hidra", "Pedrollo", "Calpeda", "Reggio", "Bestflow", "Hunter", "Rain Bird", "Amiad", "Azud"].map((b) => (
              <li key={b}>
                <Link href={`/bombas?marca=${encodeURIComponent(b)}`} className="text-sm font-bold text-slate-500 hover:text-[#006e0c] transition-all flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-[#006e0c] group-hover:scale-150 transition-all"></span>
                  <span style={{ fontFamily: "var(--font-manrope)" }}>{b}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Office info */}
        <div>
          <h4 className="text-[10px] font-extrabold text-[#4059aa] uppercase tracking-[0.4em] mb-10">Oficina Técnica</h4>
          <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
             <div className="flex gap-4 items-start mb-6">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#006e0c] shadow-sm shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-[#1e293b] leading-relaxed" style={{ fontFamily: "var(--font-manrope)" }}>
                  Dolores Bernal #1485, Oficina 2<br />
                  <span className="text-slate-400 font-medium">Maipú — Santiago, Chile</span>
                </p>
             </div>
             <Link 
               href="/contacto" 
               className="flex items-center justify-center gap-2 w-full py-4 bg-white border border-slate-200 rounded-2xl text-xs font-extrabold text-[#1e293b] hover:bg-[#1e293b] hover:text-white transition-all uppercase tracking-widest"
             >
               Ver en Mapa
             </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#f8fafc] border-t border-slate-100">
        <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-400">
            <span>© {new Date().getFullYear()} Hidra SPA</span>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
            <span>Ingeniería en Movimiento</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-[9px] font-extrabold text-slate-300 uppercase tracking-widest">Pagos Seguros vía</span>
            <Image
              src="/images/logo_webpay.svg"
              alt="Webpay Plus"
              width={100}
              height={30}
              className="h-6 w-auto opacity-30 hover:opacity-100 transition-all duration-700 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
