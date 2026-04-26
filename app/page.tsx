import Link from "next/link";
import Image from "next/image";
import { getProducts, isRealProduct } from "@/lib/products-server";
import { isVenta } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import CategorySlider from "@/components/CategorySlider";
import CategoryRectSlider from "@/components/CategoryRectSlider";
import BrandCarousel from "@/components/BrandCarousel";
import PumpBrands from "@/components/PumpBrands";

const categorySlides = [
  { name: "Bombas", img: "/images/categories/bombas.png", href: "/bombas" },
  { name: "Control", img: "/images/categories/control.png", href: "/catalogo/control" },
  { name: "Riego Agrícola", img: "/images/categories/riego-agricola.png", href: "/catalogo/riego-agricola" },
  { name: "Riego Áreas Verdes", img: "/images/categories/riego-areas-verdes.png", href: "/catalogo/riego-areas-verdes" },
  { name: "Tuberías", img: "/images/categories/tuberias.png", href: "/catalogo/tuberias" },
  { name: "Válvulas", img: "/images/categories/valvulas.png", href: "/catalogo/valvulas" },
];

const features = [
  { icon: "🏆", title: "Marcas reconocidas en el mercado", desc: "Trabajamos con las mejores marcas italianas y americanas." },
  { icon: "🚚", title: "Envíos a todo Chile", desc: "Despacho rápido a cualquier punto del país." },
  { icon: "📦", title: "Retiros disponibles en Santiago", desc: "Retira en nuestras oficinas en Maipú, Santiago." },
  { icon: "💰", title: "Precios Competitivos", desc: "Los mejores precios del mercado garantizados." },
];

export default function HomePage() {
  const allProducts = getProducts().filter((p) => p.publicado);
  
  // Featured: products marked as 'destacado', or fallback to those with HP specs
  let featured = allProducts.filter((p) => p.destacado);
  if (featured.length === 0) {
    featured = allProducts.filter((p) => p.hp.length > 0).slice(0, 6);
  } else {
    featured = featured.slice(0, 6); // Limit to 6
  }

  // Electrobombas carousel: Products from the 4 main brands with price
  const bombasConPrecio = allProducts.filter(
    (p) => isRealProduct(p) && isVenta(p.topCategoria) && p.precio > 0
  );
  const mainBrands = ["Pedrollo", "Calpeda", "Reggio", "Bestflow"];
  const electrobombasCarousel = bombasConPrecio
    .filter((p) => mainBrands.includes(p.marca))
    .slice(0, 8); // Show up to 8 products from these brands

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

      {/* ========== PUMP BRANDS MODULE ========== */}
      <PumpBrands />

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

      {/* ========== MARCAS DE FILTROS ========== */}
      <BrandCarousel />

      {/* ========== NUESTROS PRODUCTOS (Slider + Catalog) ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <h2
            className="text-center font-bold mb-10 uppercase"
            style={{ fontFamily: "var(--font-nunito-sans)", color: "#54595F", fontWeight: 700, fontSize: 28 }}
          >
            NUESTROS PRODUCTOS
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6 items-stretch mb-12">
            {/* Left Column: Category Slider (65%) */}
            <div className="w-full md:w-[65%]">
              <CategoryRectSlider categories={categorySlides} />
            </div>

            {/* Right Column: Catálogo (35%) */}
            <div className="w-full md:w-[35%]">
              <Link href="/catalogo" className="group relative block h-full min-h-[300px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/consulta-catalogo.webp" 
                  alt="Consulta nuestro catálogo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
              </Link>
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="text-center">
            <a
              href="https://wa.me/56997107845"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.893-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.89-11.893 11.89-.199 0-.399-.012-.593-.035l-6.191 1.621c-.482.126-.957.172-1.422.172-.857 0-1.611-.253-2.146-.732-.489-.439-.817-1.129-.734-2.005zm4.032-5.753l-.248.437c-1.01 1.772-1.545 3.812-1.545 5.894 0 .438.163.812.441 1.062.242.244.629.404 1.157.301l4.437-1.162.483.287c1.3.774 2.766 1.182 4.28 1.182 5.674 0 10.291-4.616 10.291-10.291s-4.617-10.291-10.291-10.291c-5.676 0-10.292 4.616-10.292 10.291 0 1.838.537 3.633 1.554 5.188l.288.439-1.135 4.144 4.331-1.132z" />
              </svg>
              COTIZA AQUÍ
            </a>
          </div>
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
