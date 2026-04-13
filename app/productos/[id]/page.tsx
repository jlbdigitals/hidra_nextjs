import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById, getProducts, getProductImageSrc, getProductSlug, getProductBySlug } from "@/lib/products";
import { isVenta, formatPrice } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import AddToCartButton from "@/components/AddToCartButton";
import ProductQuoteForm from "@/components/ProductQuoteForm";

export async function generateStaticParams() {
  return getProducts()
    .slice(0, 200)
    .map((p) => ({ id: getProductSlug(p) }));
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) notFound();

  // Related: same top category
  const related = getProducts()
    .filter((p) => p.publicado && p.topCategoria === product.topCategoria && p.id !== product.id)
    .slice(0, 3);

  const brand = product.categorias
    .find((c) => c.includes(" > "))
    ?.split(" > ")[1] ?? null;

  const series = product.categorias
    .find((c) => c.split(" > ").length >= 3)
    ?.split(" > ")[2] ?? null;

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#7A7A7A] mb-6 flex-wrap">
        <Link href="/" className="hover:text-[#53B94A]">Inicio</Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-[#53B94A]">Catálogo</Link>
        <span>/</span>
        <Link
          href={`/productos?categoria=${encodeURIComponent(product.topCategoria)}`}
          className="hover:text-[#53B94A]"
        >
          {product.topCategoria}
        </Link>
        {brand && (
          <>
            <span>/</span>
            <Link
              href={`/productos?marca=${encodeURIComponent(brand)}`}
              className="hover:text-[#53B94A]"
            >
              {brand}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-[#54595F] font-semibold">{product.nombre}</span>
      </nav>

      {/* Product main — 2 columns, 50/50 */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        {/* Image column */}
        <div className="lg:w-1/2">
          <div
            className="bg-white flex items-center justify-center overflow-hidden rounded-lg"
            style={{ minHeight: 480 }}
          >
            {getProductImageSrc(product) ? (
              <ProductImage
                src={getProductImageSrc(product)!}
                alt={product.nombre}
                className="max-w-full max-h-[460px] object-contain p-6"
              />
            ) : (
              <div className="text-8xl opacity-20">💧</div>
            )}
          </div>
        </div>

        {/* Info column — bg #F3F8F3, padding 30px, margin 20px (matches elementor-919) */}
        <div
          className="lg:w-1/2 flex flex-col gap-4"
          style={{
            backgroundColor: "#F3F8F3",
            padding: 30,
            margin: "0 0 0 0",
          }}
        >
          {/* Category meta */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-[#7A7A7A]">
              Categoría:{" "}
              <Link
                href={`/productos?categoria=${encodeURIComponent(product.topCategoria)}`}
                className="font-bold"
                style={{ color: "#53B94A" }}
              >
                {product.topCategoria}
              </Link>
            </span>
            {brand && (
              <span className="text-xs text-[#7A7A7A]">
                Marca:{" "}
                <Link
                  href={`/productos?marca=${encodeURIComponent(brand)}`}
                  className="font-bold"
                  style={{ color: "#53B94A" }}
                >
                  {brand}
                </Link>
              </span>
            )}
            {series && (
              <span className="text-xs text-[#7A7A7A]">
                Serie: <span className="font-semibold text-[#54595F]">{series}</span>
              </span>
            )}
          </div>

          {/* Title — Nunito 34px 700, color #54595F */}
          <h1
            style={{
              fontFamily: "var(--font-nunito)",
              fontSize: 34,
              fontWeight: 700,
              color: "#54595F",
              lineHeight: 1.2,
            }}
          >
            {product.nombre}
          </h1>

          {/* Specs */}
          {(product.hp.length > 0 || product.voltaje.length > 0) && (
            <div className="flex flex-wrap gap-3">
              {product.hp.length > 0 && (
                <div>
                  <p className="text-xs text-[#7A7A7A] mb-1">Potencia (HP)</p>
                  <div className="flex flex-wrap gap-1">
                    {product.hp.map((h) => (
                      <span
                        key={h}
                        className="text-sm font-semibold px-2.5 py-0.5 rounded"
                        style={{ backgroundColor: "#F3F8F3", color: "#53B94A", border: "1px solid #53B94A" }}
                      >
                        {h} HP
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.voltaje.length > 0 && (
                <div>
                  <p className="text-xs text-[#7A7A7A] mb-1">Voltaje</p>
                  <div className="flex flex-wrap gap-1">
                    {product.voltaje.map((v) => (
                      <span
                        key={v}
                        className="text-sm font-semibold px-2.5 py-0.5 rounded"
                        style={{ backgroundColor: "#F3F8F3", color: "#54595F", border: "1px solid #e0e0e0" }}
                      >
                        {v}V
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {product.descripcionCorta && (
            <div>
              <p
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ fontFamily: "var(--font-nunito)", fontSize: 16, color: "#7A7A7A" }}
              >
                {product.descripcionCorta}
              </p>
            </div>
          )}

          {product.descripcion && product.descripcion !== product.descripcionCorta && (
            <div
              className="border-t border-[#e0e0e0] pt-3"
            >
              <p
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ fontFamily: "var(--font-nunito)", fontSize: 16, color: "#7A7A7A" }}
              >
                {product.descripcion}
              </p>
            </div>
          )}

          {/* Price + CTA */}
          {isVenta(product.topCategoria) && product.precio > 0 && (
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold" style={{ color: "#53B94A", fontFamily: "var(--font-nunito)" }}>
                {formatPrice(product.precio)}
              </p>
              <span className="text-sm text-[#7A7A7A]">+ IVA</span>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-1">
            {isVenta(product.topCategoria) && product.precio > 0 && (
              <div className="flex flex-col sm:flex-row gap-3">
                <AddToCartButton product={product} className="flex-1" full showPrice={false} />
                <Link
                  href="/carrito"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 font-semibold text-sm rounded border-2 transition-colors hover:opacity-90"
                  style={{ color: "#53B94A", borderColor: "#53B94A" }}
                >
                  Ver carrito
                </Link>
              </div>
            )}
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
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2
            className="font-bold mb-6"
            style={{ fontFamily: "var(--font-nunito-sans)", fontSize: 22, fontWeight: 700, color: "#54595F" }}
          >
            Productos relacionados
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ columnGap: 20, rowGap: 40 }}
          >
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
