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
            Especialistas en equipos hidráulicos. Suministramos equipos de alta calidad para bombeo, filtración y control de fluidos en los sectores industriales y agrícolas más exigentes de Chile.
          </p>
          <div className="flex flex-col gap-5 pt-4">
            <a href="https://wa.me/56997107845" className="flex items-center gap-4 text-[#1e293b] hover:text-[#006e0c] font-extrabold transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 group-hover:bg-[#006e0c]/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-5 h-5 text-[#006e0c]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.893-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.89-11.893 11.89-.199 0-.399-.012-.593-.035l-6.191 1.621c-.482.126-.957.172-1.422.172-.857 0-1.611-.253-2.146-.732-.489-.439-.817-1.129-.734-2.005zm4.032-5.753l-.248.437c-1.01 1.772-1.545 3.812-1.545 5.894 0 .438.163.812.441 1.062.242.244.629.404 1.157.301l4.437-1.162.483.287c1.3.774 2.766 1.182 4.28 1.182 5.674 0 10.291-4.616 10.291-10.291s-4.617-10.291-10.291-10.291c-5.676 0-10.292 4.616-10.292 10.291 0 1.838.537 3.633 1.554 5.188l.288.439-1.135 4.144 4.331-1.132z" />
                </svg>
              </div>
              <span className="text-base font-extrabold" style={{ fontFamily: "var(--font-manrope)" }}>+56 9 9710 7845</span>
            </a>
            <a href="tel:+56227238788" className="flex items-center gap-4 text-[#1e293b] hover:text-[#4059aa] font-extrabold transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 group-hover:bg-[#4059aa]/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-5 h-5 text-[#4059aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-base font-extrabold" style={{ fontFamily: "var(--font-manrope)" }}>+56 2 2723 8788</span>
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
          <h4 className="text-[10px] font-extrabold text-[#4059aa] uppercase tracking-[0.4em] mb-10">Oficina Principal</h4>
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
            <span>© {new Date().getFullYear()} Hidra Ltda.</span>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
            <span>Agua en Movimiento</span>
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
