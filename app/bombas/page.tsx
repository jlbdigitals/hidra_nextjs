import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getProducts, isRealProduct } from "@/lib/products-server";
import { isVenta, formatPrice } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";
import BombasSidebar from "./BombasSidebar";

export const metadata: Metadata = {
  title: "Bombas — Hidra",
  description: "Bombas de agua disponibles para compra inmediata. Pedrollo, Calpeda, Bestflow y Reggio.",
};

const PAGE_SIZE = 24;

export default async function BombasPage({
  searchParams,
}: {
  searchParams: Promise<{ marca?: string; serie?: string; hp?: string; voltaje?: string; page?: string }>;
}) {
  const { marca, serie, hp, voltaje, page } = await searchParams;

  // All saleable Bombas
  const allProducts = getProducts().filter(
    (p) => p.publicado && isRealProduct(p) && isVenta(p.topCategoria) && p.precio > 0
  );

  // Build brand → series map for sidebar
  const brandMap = new Map<string, Set<string>>();
  for (const p of allProducts) {
    for (const c of p.categorias) {
      const parts = c.split(" > ");
      if (parts[0] === "Bombas" && parts.length >= 2) {
        const brand = parts[1];
        if (!brandMap.has(brand)) brandMap.set(brand, new Set());
        if (parts.length >= 3) brandMap.get(brand)!.add(parts[2]);
      }
    }
  }
  const brandList = Array.from(brandMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([brand, seriesSet]) => ({
      brand,
      series: Array.from(seriesSet).sort(),
    }));

  // HP and Voltaje values from Bombas products only
  const hpSet = new Set<string>();
  const voltajeSet = new Set<string>();
  for (const p of allProducts) {
    for (const h of p.hp) hpSet.add(h);
    for (const v of p.voltaje) voltajeSet.add(v);
  }
  const hpValues = Array.from(hpSet).sort((a, b) => parseFloat(a) - parseFloat(b));
  const voltajes = Array.from(voltajeSet).sort();

  // Apply filters
  let filtered = allProducts;
  if (marca) {
    filtered = filtered.filter((p) =>
      p.categorias.some((c) => c.includes(`> ${marca}`))
    );
  }
  if (serie) {
    filtered = filtered.filter((p) =>
      p.categorias.some((c) => c.includes(`> ${serie}`))
    );
  }
  if (hp) {
    filtered = filtered.filter((p) => p.hp.includes(hp));
  }
  if (voltaje) {
    filtered = filtered.filter((p) => p.voltaje.includes(voltaje));
  }

  // Pagination
  const currentPage = parseInt(page ?? "1") || 1;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageProducts = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const pageHref = (p: number) => {
    const qs = new URLSearchParams();
    if (marca) qs.set("marca", marca);
    if (serie) qs.set("serie", serie);
    if (hp) qs.set("hp", hp);
    if (voltaje) qs.set("voltaje", voltaje);
    if (p > 1) qs.set("page", String(p));
    const s = qs.toString();
    return `/bombas${s ? `?${s}` : ""}`;
  };

  const activeFilters = [marca, serie, hp ? `${hp} HP` : null, voltaje ? `${voltaje}V` : null].filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: "#53B94A" }} className="py-10 px-4">
        <div className="max-w-[1140px] mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-2">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <span className="text-white font-semibold">Bombas</span>
          </nav>
          <h1
            className="text-3xl font-bold text-white mb-1"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Bombas
          </h1>
          <p className="text-white/85 text-sm">
            Bombas disponibles para compra · {allProducts.length} productos
          </p>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block shrink-0" style={{ width: "22%" }}>
            <Suspense>
              <BombasSidebar
                brands={brandList}
                hpValues={hpValues}
                voltajes={voltajes}
              />
            </Suspense>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[#7A7A7A]">
                {activeFilters.length > 0 && (
                  <span className="font-semibold text-[#54595F]">
                    {activeFilters.join(" · ")}{" — "}
                  </span>
                )}
                {filtered.length} productos
              </p>
              {activeFilters.length > 0 && (
                <Link
                  href="/bombas"
                  className="text-xs font-semibold hover:underline"
                  style={{ color: "#53B94A" }}
                >
                  × Limpiar filtros
                </Link>
              )}
            </div>

            {/* Grid */}
            {pageProducts.length > 0 ? (
              <>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  style={{ columnGap: 20, rowGap: 24 }}
                >
                  {pageProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    {currentPage > 1 && (
                      <Link
                        href={pageHref(currentPage - 1)}
                        className="px-4 py-2 text-sm font-semibold rounded border transition-colors hover:bg-[#F3F8F3]"
                        style={{ borderColor: "#e0e0e0", color: "#54595F" }}
                      >
                        ← Anterior
                      </Link>
                    )}
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      const n =
                        totalPages <= 7
                          ? i + 1
                          : currentPage <= 4
                          ? i + 1
                          : currentPage >= totalPages - 3
                          ? totalPages - 6 + i
                          : currentPage - 3 + i;
                      return (
                        <Link
                          key={n}
                          href={pageHref(n)}
                          className="w-9 h-9 flex items-center justify-center text-sm font-semibold rounded transition-colors"
                          style={
                            n === currentPage
                              ? { backgroundColor: "#53B94A", color: "white" }
                              : { border: "1px solid #e0e0e0", color: "#54595F" }
                          }
                        >
                          {n}
                        </Link>
                      );
                    })}
                    {currentPage < totalPages && (
                      <Link
                        href={pageHref(currentPage + 1)}
                        className="px-4 py-2 text-sm font-semibold rounded border transition-colors hover:bg-[#F3F8F3]"
                        style={{ borderColor: "#e0e0e0", color: "#54595F" }}
                      >
                        Siguiente →
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="py-16 text-center">
                <p className="text-[#7A7A7A]">No se encontraron productos con esos filtros.</p>
                <Link href="/bombas" className="text-sm font-semibold mt-3 inline-block" style={{ color: "#53B94A" }}>
                  Ver todos los productos
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
