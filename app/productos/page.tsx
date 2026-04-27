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

  const allProducts = await filterProducts({ categoria, marca, hp, voltaje, q });
  const topCategories = await getTopCategories();
  const subcategories = categoria ? await getSubcategories(categoria) : [];
  const hpValues = await getHpValues();
  const voltajesAll = await getVoltajes();

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
    <div className="bg-white pb-32">
      {/* Hero Section */}
      <div className="relative bg-[#0f172a] py-24 overflow-hidden mb-12">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-br from-[#006e0c] to-transparent blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-tl from-[#4059aa] to-transparent blur-[120px]" />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="flex flex-col gap-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#006e0c] uppercase tracking-[0.4em] mb-4">
              <a href="/" className="hover:text-[#53B94A] transition-colors">Inicio</a>
              <span className="opacity-50">/</span>
              <span className="text-white">Productos</span>
              {categoria && (
                <>
                  <span className="opacity-50">/</span>
                  <span className="text-white opacity-70">{categoria}</span>
                </>
              )}
            </div>
            
            <h1
              className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {q ? (
                <>Resultados para <span className="text-[#53B94A]">"{q}"</span></>
              ) : (
                <>Catálogo <span className="text-[#4059aa]">General</span></>
              )}
            </h1>
            <p className="text-lg text-slate-400 font-medium max-w-2xl" style={{ fontFamily: "var(--font-manrope)" }}>
              Explora nuestra gama completa de soluciones hidráulicas de alta eficiencia y rendimiento industrial.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4 shrink-0">
            <div className="sticky top-32">
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
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-[0.2em]">Listado de productos</span>
                <h2 className="text-2xl font-extrabold text-[#1e293b]" style={{ fontFamily: "var(--font-manrope)" }}>{pageTitle}</h2>
              </div>
              <p className="text-sm font-bold text-[#64748b]">
                <span className="text-[#1e293b]">{allProducts.length}</span> Productos encontrados
              </p>
            </div>

            {products.length === 0 ? (
              <div className="bg-slate-50 rounded-[40px] p-20 text-center border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-400">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-[#1e293b] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>No encontramos lo que buscas</h3>
                <p className="text-slate-500 font-medium mb-10 max-w-md mx-auto">Intenta ajustar tus filtros o realiza una búsqueda con términos diferentes.</p>
                <a
                  href="/productos"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#1e293b] text-white text-sm font-extrabold rounded-2xl hover:bg-black transition-all shadow-xl shadow-black/10"
                >
                  Reiniciar filtros
                </a>
              </div>
            ) : (
              <>
                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mb-20">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="flex items-center justify-center gap-2">
                    {currentPage > 1 && (
                      <a
                        href={buildPageUrl(params, currentPage - 1)}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-slate-100 text-[#1e293b] hover:border-[#006e0c] hover:text-[#006e0c] transition-all group"
                      >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </a>
                    )}
                    
                    <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-3xl border border-slate-100">
                      {getPaginationRange(currentPage, totalPages).map((p, idx) =>
                        p === "..." ? (
                          <span key={`ellipsis-${idx}`} className="px-3 text-slate-400 font-bold">...</span>
                        ) : (
                          <a
                            key={p}
                            href={buildPageUrl(params, p as number)}
                            className={`w-10 h-10 flex items-center justify-center text-sm font-extrabold rounded-2xl transition-all ${
                              p === currentPage 
                                ? "bg-[#006e0c] text-white shadow-lg shadow-[#006e0c]/20" 
                                : "text-slate-600 hover:bg-white hover:text-[#006e0c] shadow-sm hover:shadow-md"
                            }`}
                            style={{ fontFamily: "var(--font-manrope)" }}
                          >
                            {p}
                          </a>
                        )
                      )}
                    </div>

                    {currentPage < totalPages && (
                      <a
                        href={buildPageUrl(params, currentPage + 1)}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-slate-100 text-[#1e293b] hover:border-[#006e0c] hover:text-[#006e0c] transition-all group"
                      >
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                  </nav>
                )}
              </>
            )}
          </main>
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
