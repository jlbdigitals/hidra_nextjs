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
      className="sticky top-0 z-50 bg-white"
      style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)" }}
    >
      <div className="max-w-[1140px] mx-auto px-4">
        {/* Top row: logo + search + cart */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center py-3 gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/images/logo.jpg"
                alt="Hidra"
                width={220}
                height={70}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Search */}
          <div className="flex justify-center w-full">
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full border border-[#e0e0e0] rounded px-4 py-2 text-sm text-[#54595F] placeholder-[#aaa] focus:outline-none focus:border-[#53B94A]"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7A7A7A] hover:text-[#53B94A]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Cart / contact */}
          <div className="flex justify-end items-center gap-4">
            <div className="hidden lg:flex flex-col items-end gap-0 whitespace-nowrap">
              <a
                href="tel:+56227238788"
                className="flex items-center gap-1.5 text-xs text-[#7A7A7A] hover:text-[#53B94A] transition-colors"
              >
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Oficina: 2 2723 8788</span>
              </a>
              <a
                href="tel:+56997107845"
                className="flex items-center gap-1.5 text-xs text-[#7A7A7A] hover:text-[#53B94A] transition-colors"
              >
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Celular: +56 9 9710 7845</span>
              </a>
            </div>
            <CartButton />
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-[#7A7A7A] p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-1 border-t border-[#f0f0f0] py-0.5">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                href={link.href}
                className="px-3 py-2.5 text-sm font-bold text-[#7A7A7A] hover:text-white hover:bg-[#53B94A] rounded transition-colors block"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                {link.label}
                {link.submenu && (
                  <svg className="inline w-3 h-3 ml-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
              {link.submenu && (
                <div className="absolute top-full left-0 hidden group-hover:block bg-[#F3F8F3] border border-[#e0e0e0] rounded shadow-lg min-w-48 z-50">
                  {link.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2.5 text-sm font-medium text-[#7A7A7A] hover:text-[#53B94A] hover:bg-[#F3F8F3] transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[#f0f0f0] bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-[#7A7A7A] hover:text-[#53B94A] rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
