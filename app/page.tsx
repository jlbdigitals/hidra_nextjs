import Link from "next/link";
import Image from "next/image";
import { getProducts, isRealProduct } from "@/lib/products";
import { isVenta } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import CategorySlider from "@/components/CategorySlider";

const categorySlides = [
  { name: "Bombas", img: "/images/categories/bombas.png", href: "/productos?categoria=Bombas" },
  { name: "Control", img: "/images/categories/control.png", href: "/productos?categoria=Control" },
  { name: "Riego Agrícola", img: "/images/categories/riego-agricola.png", href: "/productos?categoria=Riego+Agrícola" },
  { name: "Riego Áreas Verdes", img: "/images/categories/riego-areas-verdes.png", href: "/productos?categoria=Riego+Áreas+Verdes" },
  { name: "Tuberías", img: "/images/categories/tuberias.png", href: "/productos?categoria=Tuberías+y+Fittings" },
  { name: "Válvulas", img: "/images/categories/valvulas.png", href: "/productos?categoria=Válvulas" },
];

const features = [
  { icon: "🏆", title: "Marcas reconocidas en el mercado", desc: "Trabajamos con las mejores marcas italianas y americanas." },
  { icon: "🚚", title: "Envíos a todo Chile", desc: "Despacho rápido a cualquier punto del país." },
  { icon: "📦", title: "Retiros disponibles en Santiago", desc: "Retira en nuestras oficinas en Maipú, Santiago." },
  { icon: "💰", title: "Precios Competitivos", desc: "Los mejores precios del mercado garantizados." },
];

export default function HomePage() {
  const allProducts = getProducts().filter((p) => p.publicado);
  // Featured: products with HP specs (actual specific models)
  const featured = allProducts.filter((p) => p.hp.length > 0).slice(0, 6);

  // Electrobombas carousel: 3 Pedrollo + 3 others, all with price
  const bombasConPrecio = allProducts.filter(
    (p) => isRealProduct(p) && isVenta(p.topCategoria) && p.precio > 0
  );
  const pedrollo = bombasConPrecio.filter((p) =>
    p.categorias.some((c) => c.includes("Pedrollo"))
  ).slice(0, 3);
  const otherBombas = bombasConPrecio.filter(
    (p) => !pedrollo.includes(p) && !p.categorias.some((c) => c.includes("Pedrollo"))
  ).slice(0, 3);
  const electrobombasCarousel = [...pedrollo, ...otherBombas];

  // Filtros carousel: up to 6 filter products
  const filtrosProducts = allProducts.filter(
    (p) => isRealProduct(p) && p.categorias.some((c) => c.startsWith("Filtros"))
  ).slice(0, 6);

  return (
    <>
      {/* ========== HERO ========== */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{ minHeight: 600 }}
      >
        <Image
          src="/images/hero.webp"
          alt="Hidra — Equipos Hidráulicos"
          fill
          className="object-cover object-center"
          priority
        />
        {/* 40% black overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />

        <div className="relative z-10 px-4 max-w-2xl">
          <h1
            className="text-white font-bold mb-3 leading-tight"
            style={{ fontFamily: "var(--font-nunito)", fontSize: 40, fontWeight: 700 }}
          >
            TODO EN BOMBAS DE AGUA Y FILTROS PARA LA INDUSTRIA Y LA AGRICULTURA
          </h1>
          <p
            className="text-white mb-8"
            style={{ fontFamily: "var(--font-nunito)", fontWeight: 600 }}
          >
            Compra Online con Envío Rápido en 24 hrs.
          </p>
          <Link
            href="/productos"
            className="inline-block px-8 py-3 text-white font-semibold rounded transition-colors"
            style={{ backgroundColor: "#53B94A" }}
          >
            Cotiza AQUI
          </Link>
        </div>
      </section>

      {/* ========== GREEN BANNER ========== */}
      <div
        className="flex items-center justify-center text-white text-center py-3 px-4"
        style={{ backgroundColor: "#53B94A", minHeight: 60 }}
      >
        <p
          className="font-semibold text-sm sm:text-base"
          style={{ fontFamily: "var(--font-nunito)", fontWeight: 600 }}
        >
          BOMBAS ONLINE - DESPACHO O RETIRO EN 25 HORAS
        </p>
      </div>

      {/* ========== FEATURES ========== */}
      <section className="bg-white py-16">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="text-center mb-8">
            <h2
              className="font-bold mb-3"
              style={{ fontFamily: "var(--font-nunito-sans)", color: "#53B94A", fontWeight: 700, fontSize: 28 }}
            >
              LOS MEJORES PRODUCTOS DE RIEGO EN UN SOLO LUGAR
            </h2>
            <p style={{ fontFamily: "var(--font-nunito-sans)", color: "#54595F", fontSize: 20 }}>
              En Hidra encontrarás una amplia variedad de productos de las mejores marcas y a excelentes precios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white"
                  style={{ backgroundColor: "#53B94A" }}
                >
                  {f.icon}
                </div>
                <h3
                  className="font-semibold"
                  style={{ fontFamily: "var(--font-nunito)", fontSize: 20, fontWeight: 600, color: "#53B94A" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-[#7A7A7A]">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/productos"
              className="inline-block px-8 py-3 text-white font-semibold rounded transition-colors"
              style={{ backgroundColor: "#53B94A" }}
            >
              Cotiza AQUI
            </Link>
          </div>
        </div>
      </section>

      {/* ========== ELECTROBOMBAS SECTION ========== */}
      <section className="py-16" style={{ backgroundColor: "#F3F8F3" }}>
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="text-center">
            <h2
              className="font-bold mb-4"
              style={{ fontFamily: "var(--font-nunito-sans)", color: "#53B94A", fontWeight: 700, fontSize: 28 }}
            >
              ELECTROBOMBAS
            </h2>
            <p
              className="mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-nunito-sans)", color: "#54595F", fontSize: 20 }}
            >
              Todo en bombas centrífugas, periféricas, sumergibles, de pozo y mucho más…
            </p>
          </div>

          {electrobombasCarousel.length > 0 && (
            <div className="mb-10">
              <ProductCarousel products={electrobombasCarousel} />
            </div>
          )}

          <div className="text-center">
            <Link
              href="/bombas"
              className="inline-block px-8 py-3 text-white font-semibold rounded transition-colors"
              style={{ backgroundColor: "#53B94A" }}
            >
              Ver todas las bombas
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FILTROS SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="text-center">
            <h2
              className="font-bold mb-4"
              style={{ fontFamily: "var(--font-nunito-sans)", color: "#53B94A", fontWeight: 700, fontSize: 28 }}
            >
              FILTROS AUTOMÁTICOS
            </h2>
            <p
              className="mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-nunito-sans)", color: "#54595F", fontSize: 20 }}
            >
              Todo en filtros automáticos de malla, anilla, arena y mucho más…
            </p>
          </div>

          {filtrosProducts.length > 0 && (
            <div className="mb-10">
              <ProductCarousel products={filtrosProducts} />
            </div>
          )}

          <div className="text-center">
            <Link
              href="/productos?categoria=Filtros"
              className="inline-block px-8 py-3 text-white font-semibold rounded transition-colors"
              style={{ backgroundColor: "#53B94A" }}
            >
              Cotiza tu filtro AQUI
            </Link>
          </div>
        </div>
      </section>

      {/* ========== PRODUCTOS DESTACADOS ========== */}
      <section className="py-16" style={{ backgroundColor: "#F3F8F3" }}>
        <div className="max-w-[1140px] mx-auto px-4">
          <h2
            className="text-center font-bold mb-8"
            style={{ fontFamily: "var(--font-nunito-sans)", color: "#54595F", fontWeight: 700, fontSize: 28 }}
          >
            Productos que destacamos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/productos"
              className="inline-block px-8 py-3 text-white font-semibold rounded transition-colors"
              style={{ backgroundColor: "#53B94A" }}
            >
              Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CATEGORY SLIDER ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <h2
            className="text-center font-bold mb-8"
            style={{ fontFamily: "var(--font-nunito-sans)", color: "#54595F", fontWeight: 700, fontSize: 28 }}
          >
            Nuestras categorías
          </h2>
          <CategorySlider categories={categorySlides} />
        </div>
      </section>

      {/* ========== CONTACT BANNER ========== */}
      <section
        className="py-10"
        style={{ backgroundColor: "#F3F8F3" }}
      >
        <div className="max-w-[1140px] mx-auto px-4 text-center">
          <p className="text-[#7A7A7A] text-lg mb-1">+569 9710 7845</p>
          <p className="text-[#7A7A7A] text-sm mb-1">Dolores Bernal #1485 oficina N°2, Maipú - Santiago</p>
          <p className="text-[#7A7A7A] text-sm mb-1">+562 2723 8788</p>
          <a href="mailto:contacto@hidra.cl" className="text-[#53B94A] text-sm font-semibold hover:underline">
            contacto@hidra.cl
          </a>
        </div>
      </section>
    </>
  );
}
