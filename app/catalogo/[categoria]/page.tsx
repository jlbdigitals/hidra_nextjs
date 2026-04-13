import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProducts, getProductImageSrc, isRealProduct } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import BrandMenu from "./BrandMenu";

const CATALOG_MAP: Record<
  string,
  { label: string; topCategoria: string; img: string; description: string; hasBrandMenu?: boolean; showAllProducts?: boolean }
> = {
  bombas: {
    label: "Bombas",
    topCategoria: "Bombas",
    img: "/images/categories/bombas.jpg",
    description: "Bombas centrífugas, sumergibles y periféricas de las mejores marcas italianas para uso doméstico, agrícola e industrial.",
  },
  filtros: {
    label: "Filtros",
    topCategoria: "Filtros",
    img: "/images/categories/filtros.jpg",
    description: "Filtros de malla, anillas y medios filtrantes para sistemas de riego y tratamiento de agua.",
    showAllProducts: true,
  },
  valvulas: {
    label: "Válvulas",
    topCategoria: "Válvulas",
    img: "/images/categories/valvulas.jpg",
    description: "Válvulas de compuerta, bola, solenoide y control hidráulico para instalaciones industriales y agrícolas.",
    showAllProducts: true,
  },
  "riego-agricola": {
    label: "Riego Agrícola",
    topCategoria: "Riego Agrícola",
    img: "/images/categories/emisores-agricola.jpg",
    description: "Sistemas de riego por aspersión, goteo y microaspersión para cultivos y plantaciones.",
  },
  "riego-areas-verdes": {
    label: "Riego Áreas Verdes",
    topCategoria: "Riego Áreas Verdes",
    img: "/images/categories/emisores-areas-verdes.jpg",
    description: "Emisores pop-up, aspersores y equipos de riego para jardines, parques y áreas verdes.",
    showAllProducts: true,
  },
  tuberias: {
    label: "Tuberías y Fittings",
    topCategoria: "Tuberías y Fittings",
    img: "/images/categories/tuberias.jpg",
    description: "Tuberías de PVC y polietileno, fittings y mangueras planas para instalaciones hidráulicas.",
    showAllProducts: true,
  },
  control: {
    label: "Control",
    topCategoria: "Control",
    img: "/images/categories/control.jpg",
    description: "Programadores de riego, sensores de humedad y lluvia, presóstatos y tableros eléctricos.",
  },
};

export async function generateStaticParams() {
  return Object.keys(CATALOG_MAP).map((categoria) => ({ categoria }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const cat = CATALOG_MAP[categoria];
  if (!cat) return { title: "Catálogo — Hidra" };
  return { title: `${cat.label} — Catálogo Hidra`, description: cat.description };
}

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoria: string }>;
  searchParams: Promise<{ marca?: string; serie?: string; page?: string }>;
}) {
  const { categoria } = await params;
  const { marca, serie, page } = await searchParams;

  const cat = CATALOG_MAP[categoria];
  if (!cat) notFound();

  // For categories like Filtros where brand entries ARE the products, skip isRealProduct
  const allProducts = getProducts().filter(
    (p) => p.publicado && p.topCategoria === cat.topCategoria && (cat.showAllProducts || isRealProduct(p))
  );

  // Deduplicate by name (some products are duplicated)
  const seen = new Set<string>();
  const deduped = allProducts.filter((p) => {
    if (seen.has(p.nombre)) return false;
    seen.add(p.nombre);
    return true;
  });

  // ── Brand menu data (Bombas only) ──────────────────────────────────────
  const brandMap = new Map<string, Set<string>>(); // brand → set of series
  for (const p of deduped) {
    for (const c of p.categorias) {
      const parts = c.split(" > ");
      if (parts[0] === cat.topCategoria && parts.length >= 2) {
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
      count: deduped.filter((p) => p.categorias.some((c) => c.includes(`> ${brand}`))).length,
    }));

  // ── Subcategory pills data (non-Bombas) ────────────────────────────────
  const subcatSet = new Set<string>();
  for (const p of deduped) {
    for (const c of p.categorias) {
      const parts = c.split(" > ");
      if (parts[0] === cat.topCategoria && parts.length >= 2) subcatSet.add(parts[1]);
    }
  }
  const subcategories = Array.from(subcatSet).sort();
  const hasSubcats = subcategories.length > 0;

  // ── Filtering ──────────────────────────────────────────────────────────
  let filtered = deduped;
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

  // ── Subcategory visual cards image map (non-Bombas) ────────────────────
  const subcatImgs: Record<string, string | null> = {};
  if (!cat.hasBrandMenu) {
    for (const sub of subcategories) {
      const first = deduped.find((p) => p.categorias.some((c) => c.includes(sub)));
      subcatImgs[sub] = first ? getProductImageSrc(first) : null;
    }
  }

  // ── Pagination ─────────────────────────────────────────────────────────
  const PAGE_SIZE = 24;
  const currentPage = parseInt(page ?? "1") || 1;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageProducts = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Build pagination href helper
  const pageHref = (p: number) => {
    const qs = new URLSearchParams();
    if (marca) qs.set("marca", marca);
    if (serie) qs.set("serie", serie);
    if (p > 1) qs.set("page", String(p));
    const s = qs.toString();
    return `/catalogo/${categoria}${s ? `?${s}` : ""}`;
  };

  return (
    <div>
      {/* Hero banner */}
      <div className="relative h-44 overflow-hidden">
        <Image src={cat.img} alt={cat.label} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} />
        <div className="absolute inset-0 flex flex-col justify-center px-6 max-w-[1140px] mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-2">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-white">Catálogo</Link>
            <span>/</span>
            <span className="text-white font-semibold">{cat.label}</span>
          </nav>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-nunito)" }}>
            {cat.label}
          </h1>
          <p className="text-white/80 text-sm mt-1 max-w-xl">{cat.description}</p>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 py-8">

        {/* ── Brand menu (Bombas) ─────────────────────────────────────── */}
        {cat.hasBrandMenu && (
          <BrandMenu categoria={categoria} brands={brandList} totalCount={deduped.length} />
        )}

        {/* ── Pill filter + visual cards (other categories) ───────────── */}
        {!cat.hasBrandMenu && hasSubcats && (
          <>
            <section className="mb-8">
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/catalogo/${categoria}`}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                  style={!marca
                    ? { backgroundColor: "#53B94A", color: "white" }
                    : { backgroundColor: "#F3F8F3", color: "#54595F", border: "1px solid #e0e0e0" }}
                >
                  Todos ({deduped.length})
                </Link>
                {subcategories.map((sub) => {
                  const count = deduped.filter((p) => p.categorias.some((c) => c.includes(sub))).length;
                  const active = marca === sub;
                  return (
                    <Link
                      key={sub}
                      href={`/catalogo/${categoria}?marca=${encodeURIComponent(sub)}`}
                      className="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                      style={active
                        ? { backgroundColor: "#53B94A", color: "white" }
                        : { backgroundColor: "#F3F8F3", color: "#54595F", border: "1px solid #e0e0e0" }}
                    >
                      {sub} ({count})
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Visual subcategory cards */}
            {!marca && subcategories.length >= 2 && (
              <section className="mb-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {subcategories.map((sub) => {
                    const count = deduped.filter((p) => p.categorias.some((c) => c.includes(sub))).length;
                    const imgSrc = subcatImgs[sub];
                    return (
                      <Link
                        key={sub}
                        href={`/catalogo/${categoria}?marca=${encodeURIComponent(sub)}`}
                        className="group flex flex-col overflow-hidden rounded-lg bg-white transition-shadow hover:shadow-md"
                        style={{ border: "1px solid #e0e0e0" }}
                      >
                        <div className="relative aspect-square overflow-hidden bg-white">
                          {imgSrc ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={imgSrc}
                              alt={sub}
                              className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">💧</div>
                          )}
                        </div>
                        <div className="px-3 py-2.5 border-t border-[#f0f0f0]">
                          <p className="text-sm font-bold leading-tight" style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}>
                            {sub}
                          </p>
                          <p className="text-xs text-[#7A7A7A] mt-0.5">{count} productos</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}

        {/* Results header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#7A7A7A]">
            {(marca || serie) && (
              <span className="font-semibold text-[#54595F]">
                {[marca, serie].filter(Boolean).join(" · ")}{" — "}
              </span>
            )}
            {filtered.length} productos
          </p>
          {(marca || serie) && (
            <Link href={`/catalogo/${categoria}`} className="text-xs font-semibold hover:underline" style={{ color: "#53B94A" }}>
              × Limpiar filtros
            </Link>
          )}
        </div>

        {/* Product grid */}
        {pageProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ columnGap: 20, rowGap: 24 }}>
              {pageProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                {currentPage > 1 && (
                  <Link href={pageHref(currentPage - 1)} className="px-4 py-2 text-sm font-semibold rounded border transition-colors hover:bg-[#F3F8F3]" style={{ borderColor: "#e0e0e0", color: "#54595F" }}>
                    ← Anterior
                  </Link>
                )}
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  const n = totalPages <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage >= totalPages - 3 ? totalPages - 6 + i : currentPage - 3 + i;
                  return (
                    <Link key={n} href={pageHref(n)} className="w-9 h-9 flex items-center justify-center text-sm font-semibold rounded transition-colors"
                      style={n === currentPage ? { backgroundColor: "#53B94A", color: "white" } : { border: "1px solid #e0e0e0", color: "#54595F" }}>
                      {n}
                    </Link>
                  );
                })}
                {currentPage < totalPages && (
                  <Link href={pageHref(currentPage + 1)} className="px-4 py-2 text-sm font-semibold rounded border transition-colors hover:bg-[#F3F8F3]" style={{ borderColor: "#e0e0e0", color: "#54595F" }}>
                    Siguiente →
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="py-16 text-center">
            <p className="text-[#7A7A7A]">No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
}
