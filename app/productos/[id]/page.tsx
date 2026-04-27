import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductById, getProducts, getProductImageSrc, getProductSlug, getProductBySlug } from "@/lib/products-server";
import { isVenta, formatPrice } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import AddToCartButton from "@/components/AddToCartButton";
import ProductQuoteForm from "@/components/ProductQuoteForm";
import ProductCarousel from "@/components/ProductCarousel";
import BackButton from "@/components/BackButton";

export async function generateStaticParams() {
  return (await getProducts())
    .slice(0, 200)
    .map((p) => ({ id: getProductSlug(p) }));
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductBySlug(id);
  if (!product) notFound();

  const brand = product.categorias
    .find((c) => c.includes(" > "))
    ?.split(" > ")[1] ?? null;

  // Related: same brand and top category
  const related = (await getProducts())
    .filter((p) =>
      p.publicado && 
      p.id !== product.id && 
      (brand ? p.categorias.some(c => c.includes(`> ${brand}`)) : p.topCategoria === product.topCategoria)
    )
    .slice(0, 12);

  const series = product.categorias
    .find((c) => c.split(" > ").length >= 3)
    ?.split(" > ")[2] ?? null;

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94a3b8] mb-10 flex-wrap">
        <Link href="/" className="hover:text-[#006e0c] transition-colors">Inicio</Link>
        <span className="text-slate-300">/</span>
        <Link href="/catalogo" className="hover:text-[#006e0c] transition-colors">Catálogo</Link>
        <span className="text-slate-300">/</span>
        <Link
          href={`/catalogo/${product.topCategoria.toLowerCase()}`}
          className="hover:text-[#006e0c] transition-colors"
        >
          {product.topCategoria}
        </Link>
        {brand && (
          <>
            <span className="text-slate-300">/</span>
            <Link
              href={`/catalogo/${product.topCategoria.toLowerCase()}?marca=${encodeURIComponent(brand)}`}
              className="hover:text-[#006e0c] transition-colors"
            >
              {brand}
            </Link>
          </>
        )}
        <span className="text-slate-300">/</span>
        <span className="text-[#1e293b]">{product.nombre}</span>
      </nav>

      {/* Back Button */}
      <div className="mb-8">
        <BackButton />
      </div>

      {/* Product main — 2 columns, 50/50 */}
      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        {/* Image column */}
        <div className="lg:w-1/2">
          <div
            className="bg-[#f8fafc] flex items-center justify-center overflow-hidden rounded-[32px] border border-[#f1f5f9] transition-all hover:shadow-[0px_40px_80px_rgba(0,0,0,0.04)]"
            style={{ minHeight: 560 }}
          >
            {getProductImageSrc(product) ? (
              <ProductImage
                src={getProductImageSrc(product)!}
                alt={product.nombre}
                className="max-w-full max-h-[500px] object-contain p-10 drop-shadow-2xl"
              />
            ) : (
              <div className="text-9xl opacity-20">💧</div>
            )}
          </div>
        </div>
        {/* Info column */}
        <div className="lg:w-1/2 flex flex-col gap-8 py-4">
          {/* Brand/Serie meta */}
          <div className="flex flex-wrap items-center gap-4">
            {brand && (
              <div className="flex items-center gap-2 px-3 py-1 bg-[#4059aa]/5 text-[#4059aa] rounded-full border border-[#4059aa]/10">
                <span className="text-[10px] font-extrabold uppercase tracking-widest">{brand}</span>
              </div>
            )}
            {series && (
              <div className="flex items-center gap-2 px-3 py-1 bg-[#006e0c]/5 text-[#006e0c] rounded-full border border-[#006e0c]/10">
                <span className="text-[10px] font-extrabold uppercase tracking-widest">{series}</span>
              </div>
            )}
            <span className="text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-[0.2em] ml-auto">REF: {String(product.id).padStart(6, '0')}</span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl lg:text-5xl font-extrabold text-[#1e293b] tracking-tight leading-[1.1]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {product.nombre}
          </h1>

          {/* Price */}
          {isVenta(product.topCategoria) && product.precio > 0 && (
            <div className="flex items-center gap-4 py-6 border-y border-[#f1f5f9]">
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold text-[#006e0c] uppercase tracking-widest mb-1">Precio Online</span>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-extrabold text-[#006e0c]" style={{ fontFamily: "var(--font-manrope)" }}>
                    {formatPrice(product.precio)}
                  </p>
                  <span className="text-sm font-bold text-[#94a3b8]">IVA INC.</span>
                </div>
              </div>
            </div>
          )}

          {/* Specs */}
          {(product.hp.length > 0 || product.voltaje.length > 0) && (
            <div className="grid grid-cols-2 gap-6">
              {product.hp.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-extrabold text-[#4059aa] uppercase tracking-widest">Potencia</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.hp.map((h) => (
                      <span
                        key={h}
                        className="text-sm font-bold px-3 py-1.5 rounded-lg bg-white border border-[#dee3ea] text-[#1e293b]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {h} HP
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.voltaje.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-extrabold text-[#4059aa] uppercase tracking-widest">Voltaje</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.voltaje.map((v) => (
                      <span
                        key={v}
                        className="text-sm font-bold px-3 py-1.5 rounded-lg bg-white border border-[#dee3ea] text-[#1e293b]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="space-y-4">
            <p
              className="text-lg text-[#64748b] leading-relaxed font-medium"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {product.descripcionCorta || product.descripcion}
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            {isVenta(product.topCategoria) && product.precio > 0 ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <AddToCartButton 
                  product={product} 
                  className="flex-[2] h-14 bg-[#006e0c] hover:bg-[#005a0a] text-white text-base font-extrabold rounded-2xl shadow-lg shadow-[#006e0c]/20 transition-all" 
                  full 
                  showPrice={false} 
                />
                <Link
                  href="/carrito"
                  className="flex-1 flex items-center justify-center gap-2 h-14 font-extrabold text-sm rounded-2xl border-2 border-[#f1f5f9] text-[#1e293b] hover:bg-[#f8fafc] transition-all"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Carrito
                </Link>
              </div>
            ) : null}
            
            <ProductQuoteForm
              productId={product.id}
              productName={product.nombre}
              productCategory={product.topCategoria}
              productBrand={brand}
              productHp={product.hp}
              productVoltaje={product.voltaje}
              productPrice={product.precio}
            />
          </div>

          {/* Payment and Trust */}
          <div className="mt-4 space-y-8 pt-8 border-t border-[#f1f5f9]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-widest">Pagos Seguros</span>
              <Image
                src="/images/logo_webpay.svg"
                alt="Webpay Plus"
                width={100}
                height={30}
                className="h-6 w-auto grayscale opacity-50"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] flex items-center justify-center text-[#4059aa] group-hover:bg-[#4059aa] group-hover:text-white transition-all duration-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#94a3b8] text-center">Calidad Garantizada</span>
              </div>
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] flex items-center justify-center text-[#4059aa] group-hover:bg-[#4059aa] group-hover:text-white transition-all duration-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#94a3b8] text-center">Envío a Regiones</span>
              </div>
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] flex items-center justify-center text-[#4059aa] group-hover:bg-[#4059aa] group-hover:text-white transition-all duration-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#94a3b8] text-center">Soporte Técnico</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-32 pt-20 border-t border-[#f1f5f9]">
          <div className="flex items-center justify-between mb-12">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-extrabold text-[#4059aa] uppercase tracking-[0.3em]">Continuar explorando</span>
              <h2 className="text-3xl font-extrabold text-[#1e293b] tracking-tight" style={{ fontFamily: "var(--font-manrope)" }}>Productos Relacionados</h2>
            </div>
          </div>
          <ProductCarousel products={related} />
        </section>
      )}
    </div>
  );
}
