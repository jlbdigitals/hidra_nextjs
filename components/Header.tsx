"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CartButton from "@/components/CartButton";

const navLinks = [
  { label: "Inicio", href: "/" },
  {
    label: "Bombas",
    href: "/bombas",
    submenu: [
      { label: "Ver todas las bombas", href: "/bombas" },
      { label: "Hidra", href: "/bombas?marca=Hidra" },
      { label: "Pedrollo", href: "/bombas?marca=Pedrollo" },
      { label: "Calpeda", href: "/bombas?marca=Calpeda" },
      { label: "Reggio", href: "/bombas?marca=Reggio" },
      { label: "Bestflow", href: "/bombas?marca=Bestflow" },
    ],
  },
  { label: "Filtros", href: "/catalogo/filtros" },
  {
    label: "Catálogo",
    href: "/catalogo",
    submenu: [
      { label: "Válvulas", href: "/catalogo/valvulas" },
      { label: "Riego Agrícola", href: "/catalogo/riego-agricola" },
      { label: "Riego Áreas Verdes", href: "/catalogo/riego-areas-verdes" },
      { label: "Tuberías y Fittings", href: "/catalogo/tuberias" },
      { label: "Control", href: "/catalogo/control" },
    ],
  },
  { label: "Zanjado", href: "/zanjado" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/productos?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setMenuOpen(false);
    }
  }

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md"
      style={{ boxShadow: "0px 10px 40px rgba(0,0,0,0.03)" }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Top row: logo + search + cart */}
        <div className="flex items-center justify-between py-5 gap-8 lg:gap-16">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image
                src="/images/logo.webp"
                alt="Hidra"
                width={200}
                height={64}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Search - Central */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative group">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Busca bombas, filtros o marcas..."
                  className="w-full bg-[#f8fafc] border border-slate-100 rounded-2xl px-6 py-3 text-sm text-[#1e293b] font-bold placeholder-slate-400 focus:outline-none focus:border-[#4059aa]/30 focus:ring-4 focus:ring-[#4059aa]/5 transition-all shadow-inner"
                  style={{ fontFamily: "var(--font-manrope)" }}
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#4059aa] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Cart / mobile actions */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Desktop Phones */}
            <div className="hidden xl:flex items-center gap-6 pr-4 border-r border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#006e0c]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.893-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.89-11.893 11.89-.199 0-.399-.012-.593-.035l-6.191 1.621c-.482.126-.957.172-1.422.172-.857 0-1.611-.253-2.146-.732-.489-.439-.817-1.129-.734-2.005zm4.032-5.753l-.248.437c-1.01 1.772-1.545 3.812-1.545 5.894 0 .438.163.812.441 1.062.242.244.629.404 1.157.301l4.437-1.162.483.287c1.3.774 2.766 1.182 4.28 1.182 5.674 0 10.291-4.616 10.291-10.291s-4.617-10.291-10.291-10.291c-5.676 0-10.292 4.616-10.292 10.291 0 1.838.537 3.633 1.554 5.188l.288.439-1.135 4.144 4.331-1.132z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">WhatsApp</span>
                  <a href="https://wa.me/56997107845" className="text-[13px] font-extrabold text-[#1e293b] hover:text-[#006e0c] transition-colors leading-tight">+56 9 9710 7845</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#4059aa]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Oficina</span>
                  <a href="tel:+56227238788" className="text-[13px] font-extrabold text-[#1e293b] hover:text-[#4059aa] transition-colors leading-tight">+56 2 2723 8788</a>
                </div>
              </div>
            </div>
            
            <CartButton />

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-50 text-[#1e293b] rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Nav Row */}
        <nav className="hidden lg:flex items-center gap-1 border-t border-slate-50 py-1">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                href={link.href}
                className="px-5 py-4 text-[13px] font-extrabold text-slate-500 hover:text-[#006e0c] transition-all flex items-center gap-2 group-hover:bg-slate-50/50 rounded-2xl"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                <span>{link.label}</span>
                {link.submenu && (
                  <svg className="w-3.5 h-3.5 opacity-40 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
              {link.submenu && (
                <div className="absolute top-[85%] left-0 hidden group-hover:block pt-4 min-w-64 z-50 animate-fade-in">
                  <div className="bg-white border border-slate-100 rounded-[24px] shadow-2xl shadow-black/10 py-3 overflow-hidden">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-6 py-3.5 text-sm font-bold text-slate-600 hover:text-[#006e0c] hover:bg-slate-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-6 py-8 flex flex-col gap-4 shadow-2xl animate-fade-in-up">
          <div className="flex flex-col gap-1">
             {navLinks.map((link) => (
               <Link
                 key={link.href}
                 href={link.href}
                 onClick={() => setMenuOpen(false)}
                 className="px-6 py-4 text-lg font-extrabold text-[#1e293b] active:bg-slate-50 rounded-2xl flex items-center justify-between"
               >
                 <span>{link.label}</span>
                 <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                 </svg>
               </Link>
             ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
             <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-[24px]">
               <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#006e0c] shadow-sm">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                 </svg>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Contacto Directo</span>
                 <a href="tel:+56997107845" className="text-base font-extrabold text-[#1e293b]">+56 9 9710 7845</a>
               </div>
             </div>
          </div>
        </div>
      )}
    </header>
  );
}
