import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e0e0e0] mt-10">
      <div className="max-w-[1140px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + description */}
        <div>
          <Image
            src="/images/logo.jpg"
            alt="Hidra"
            width={180}
            height={57}
            className="h-10 w-auto object-contain mb-4"
          />
          <p className="text-sm text-[#7A7A7A] leading-relaxed">
            Distribuidores de equipos hidráulicos, bombas y sistemas de riego para la industria y la agricultura.
          </p>
          <div className="flex flex-col gap-2 mt-4 text-sm">
            <a href="tel:+56997107845" className="flex items-center gap-2 text-[#7A7A7A] hover:text-[#53B94A] transition-colors">
              <svg className="w-4 h-4 text-[#53B94A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +56 9 9710 7845
            </a>
            <a href="tel:+56227238788" className="flex items-center gap-2 text-[#7A7A7A] hover:text-[#53B94A] transition-colors">
              <svg className="w-4 h-4 text-[#53B94A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +56 2 2723 8788
            </a>
            <a href="mailto:contacto@hidra.cl" className="flex items-center gap-2 text-[#7A7A7A] hover:text-[#53B94A] transition-colors">
              <svg className="w-4 h-4 text-[#53B94A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contacto@hidra.cl
            </a>
            <span className="flex items-start gap-2 text-[#7A7A7A]">
              <svg className="w-4 h-4 text-[#53B94A] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Dolores Bernal #1485 oficina N°2, Maipú — Santiago
            </span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-bold text-[#54595F] mb-4">Productos</h4>
          <ul className="space-y-2 text-sm text-[#7A7A7A]">
            {[
              { label: "Bombas", href: "/bombas" },
              { label: "Filtros", href: "/productos?categoria=Filtros" },
              { label: "Riego Agrícola", href: "/productos?categoria=Riego+Agrícola" },
              { label: "Riego Áreas Verdes", href: "/productos?categoria=Riego+Áreas+Verdes" },
              { label: "Control", href: "/productos?categoria=Control" },
              { label: "Válvulas", href: "/productos?categoria=Válvulas" },
              { label: "Tuberías y Fittings", href: "/productos?categoria=Tuberías+y+Fittings" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#53B94A] transition-colors flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-[#53B94A]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div>
          <h4 className="font-bold text-[#54595F] mb-4">Marcas</h4>
          <ul className="space-y-2 text-sm text-[#7A7A7A]">
            {["Pedrollo", "Calpeda", "Reggio", "Bestflow", "Hunter", "Rain Bird", "K Rain"].map((b) => (
              <li key={b}>
                <Link href={`/productos?marca=${encodeURIComponent(b)}`} className="hover:text-[#53B94A] transition-colors flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-[#53B94A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {b}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#e0e0e0]">
        <div className="max-w-[1140px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#aaa]">
          <span>© {new Date().getFullYear()} Hidra. Todos los derechos reservados.</span>
          <span>Todo en bombas de agua y filtros para la industria y la agricultura.</span>
        </div>
      </div>
    </footer>
  );
}
