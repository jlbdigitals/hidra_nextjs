import { Suspense } from "react";
import {
  filterProducts,
  getTopCategories,
  getSubcategories,
  getHpValues,
  getVoltajes,
} from "@/lib/products-server";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";

const PAGE_SIZE = 18;

interface SearchParams {
  categoria?: string;
  marca?: string;
  hp?: string;
  voltaje?: string;
  q?: string;
  page?: string;
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { categoria = "", marca = "", hp = "", voltaje = "", q = "", page = "1" } = params;
  const currentPage = parseInt(page) || 1;

  const allProducts = filterProducts({ categoria, marca, hp, voltaje, q });
  const topCategories = getTopCategories();
  const subcategories = categoria ? getSubcategories(categoria) : [];
  const hpValues = getHpValues();
  const voltajesAll = getVoltajes();

  const totalPages = Math.ceil(allProducts.length / PAGE_SIZE);
  const products = allProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const categoryMenuItems = topCategories.map((c) => ({
    label: c,
    href: `/productos?categoria=${encodeURIComponent(c)}`,
  }));

  const pageTitle = q
    ? `Búsqueda: "${q}"`
    : categoria
    ? categoria
    : "Catálogo";

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[#7A7A7A] mb-5">
        <a href="/" className="hover:text-[#53B94A]">Inicio</a>
        <span>/</span>
        <span className="text-[#54595F] font-semibold">{pageTitle}</span>
        {marca && (
          <>
            <span>/</span>
            <span className="text-[#54595F] font-semibold">{marca}</span>
          </>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar — 20% width matching WooCommerce layout */}
        <div className="hidden lg:block shrink-0" style={{ width: "20%" }}>
          <Suspense>
            <FilterSidebar
              topCategories={topCategories}
              subcategories={subcategories}
              hpValues={hpValues}
              voltajes={voltajesAll}
              selectedCategoria={categoria}
              selectedMarca={marca}
              selectedHp={hp}
              selectedVoltaje={voltaje}
              categoryMenuItems={categoryMenuItems}
            />
          </Suspense>
        </div>

        {/* Products — 80% width */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1
                className="font-bold text-xl"
                style={{ fontFamily: "var(--font-nunito)", color: "#54595F", fontWeight: 700 }}
              >
                {pageTitle}
              </h1>
              <p className="text-xs text-[#7A7A7A] mt-0.5">
                Mostrando {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, allProducts.length)} de {allProducts.length} productos
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="bg-[#F3F8F3] rounded p-12 text-center border border-[#e0e0e0]">
              <p className="text-[#54595F] font-semibold mb-2">No se encontraron productos</p>
              <p className="text-[#7A7A7A] text-sm mb-5">Intenta con otros filtros o términos de búsqueda</p>
              <a
                href="/productos"
                className="inline-block px-6 py-2.5 text-white text-sm font-semibold rounded transition-colors"
                style={{ backgroundColor: "#53B94A" }}
              >
                Ver todos los productos
              </a>
            </div>
          ) : (
            <>
              {/* Grid — 3 columns, 20px column gap, 40px row gap (matches WooCommerce) */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8"
                style={{ columnGap: 20, rowGap: 40 }}
              >
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {/* Pagination — WooCommerce style */}
              {totalPages > 1 && (
                <nav className="flex items-center justify-center gap-1">
                  {currentPage > 1 && (
                    <a
                      href={buildPageUrl(params, currentPage - 1)}
                      className="px-3 py-1.5 text-sm border border-[#e0e0e0] rounded text-[#54595F] hover:border-[#53B94A] hover:text-[#53B94A] transition-colors"
                    >
                      ←
                    </a>
                  )}
                  {getPaginationRange(currentPage, totalPages).map((p, idx) =>
                    p === "..." ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-[#7A7A7A]">…</span>
                    ) : (
                      <a
                        key={p}
                        href={buildPageUrl(params, p as number)}
                        className="w-9 h-9 flex items-center justify-center text-sm border rounded transition-colors"
                        style={{
                          borderColor: p === currentPage ? "#53B94A" : "#e0e0e0",
                          backgroundColor: p === currentPage ? "#53B94A" : "white",
                          color: p === currentPage ? "white" : "#54595F",
                          fontFamily: "var(--font-nunito)",
                        }}
                      >
                        {p}
                      </a>
                    )
                  )}
                  {currentPage < totalPages && (
                    <a
                      href={buildPageUrl(params, currentPage + 1)}
                      className="px-3 py-1.5 text-sm border border-[#e0e0e0] rounded text-[#54595F] hover:border-[#53B94A] hover:text-[#53B94A] transition-colors"
                    >
                      →
                    </a>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function buildPageUrl(params: SearchParams, page: number): string {
  const p = new URLSearchParams();
  if (params.categoria) p.set("categoria", params.categoria);
  if (params.marca) p.set("marca", params.marca);
  if (params.hp) p.set("hp", params.hp);
  if (params.voltaje) p.set("voltaje", params.voltaje);
  if (params.q) p.set("q", params.q);
  p.set("page", String(page));
  return `/productos?${p.toString()}`;
}

function getPaginationRange(current: number, total: number): (number | string)[] {
  const range: (number | string)[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - current) <= 2) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }
  return range;
}
