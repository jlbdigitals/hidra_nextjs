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
  { name: "Bombas", img: "/images/categories/bombas.webp", href: "/bombas" },
  { name: "Control", img: "/images/categories/control.webp", href: "/catalogo/control" },
  { name: "Riego Agrícola", img: "/images/categories/riego-agricola.webp", href: "/catalogo/riego-agricola" },
  { name: "Riego Áreas Verdes", img: "/images/categories/riego-areas-verdes.webp", href: "/catalogo/riego-areas-verdes" },
  { name: "Tuberías", img: "/images/categories/tuberias.webp", href: "/catalogo/tuberias" },
  { name: "Válvulas", img: "/images/categories/valvulas.webp", href: "/catalogo/valvulas" },
];

const features = [
  { icon: "🔒", title: "Pagos Seguros", desc: "Transacciones protegidas mediante Webpay y transferencias bancarias directas." },
  { icon: "🚚", title: "Envíos a todo Chile", desc: "Despacho rápido y garantizado a través de los principales transportes del país." },
  { icon: "🛠️", title: "Garantía Oficial", desc: "Respaldo directo de fábrica en todos nuestros equipos y componentes." },
  { icon: "🤝", title: "Asesoría Técnica Directa", desc: "Le ayudamos a seleccionar el equipo preciso para su necesidad específica." },
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
        className="relative flex items-center justify-start text-left overflow-hidden bg-[#0f172a]"
        style={{ minHeight: '85vh' }}
      >
        <Image
          src="/images/hero.webp"
          alt="Hidra — Equipos Hidráulicos"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        {/* Gradient overlay for better text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 px-6 lg:px-12 max-w-[1280px] mx-auto w-full">
          <div className="max-w-3xl space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#006e0c] text-white text-[10px] font-extrabold uppercase tracking-[0.2em]">
                Liderazgo en Soluciones Hidráulicas
              </span>
              <h1
                className="text-white font-extrabold leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-manrope)", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                PRECISIÓN INDUSTRIAL <br />
                PARA EL <span className="text-[#53b94a]">CRECIMIENTO</span> AGRÍCOLA
              </h1>
              <p
                className="text-lg text-slate-300 max-w-xl leading-relaxed"
                style={{ fontFamily: "var(--font-manrope)", fontWeight: 400 }}
              >
                Especialistas en sistemas de bombeo y filtración de alta eficiencia. 
                Tecnología avanzada para optimizar cada gota de su inversión.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/productos"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#006e0c] text-white font-bold rounded-base shadow-[0px_8px_30px_rgba(0,110,12,0.3)] hover:bg-[#005a0a] transition-all hover:-translate-y-1"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                EXPLORAR CATÁLOGO
              </Link>
              <Link
                href="/bombas"
                className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-base hover:bg-white/20 transition-all"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                SOLUCIONES DE BOMBEO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TICKER / ANNOUNCEMENT ========== */}
      <div className="bg-[#f8fafc] border-b border-[#dee3ea] overflow-hidden py-3">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-center gap-12 animate-in fade-in duration-1000">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#006e0c] animate-pulse"></div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">EQUIPOS DE ALTA CALIDAD</span>
          </div>
          <div className="hidden md:flex items-center gap-3 border-l border-[#dee3ea] pl-12">
            <div className="w-2 h-2 rounded-full bg-[#4059aa]"></div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">ENVÍOS A TODO CHILE</span>
          </div>
          <div className="hidden lg:flex items-center gap-3 border-l border-[#dee3ea] pl-12">
            <div className="w-2 h-2 rounded-full bg-[#53b94a]"></div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">ATENCIÓN DIRECTA Y PERSONALIZADA</span>
          </div>
        </div>
      </div>

      {/* ========== PUMP FEATURED (NEW GRAPHIC) ========== */}
      <section className="py-24 lg:py-32 bg-[#0f172a] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
              <Image 
                src="/images/bomba-featured.png" 
                alt="Bomba Hidráulica Premium" 
                width={600} 
                height={600} 
                className="relative z-10 rounded-3xl shadow-2xl border border-white/5"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#53b94a]">Equipos de Alto Rendimiento</span>
                <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight" style={{ fontFamily: "var(--font-manrope)" }}>
                  BOMBAS QUE <span className="text-[#53b94a]">IMPULSAN</span> <br />
                  SU PRODUCCIÓN
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                  Nuestras electrobombas están diseñadas para soportar las condiciones más exigentes, 
                  garantizando un flujo constante y eficiente en cada ciclo de riego.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#53b94a] border border-white/10">✓</div>
                  <span className="font-bold">Eficiencia Energética Superior</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#53b94a] border border-white/10">✓</div>
                  <span className="font-bold">Construcción en Acero Inoxidable y Bronce</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#53b94a] border border-white/10">✓</div>
                  <span className="font-bold">Respaldo Técnico y Repuestos Garantizados</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/bombas" className="inline-flex items-center gap-3 px-8 py-4 bg-[#006e0c] text-white font-extrabold rounded-base hover:bg-[#005a0a] transition-all">
                  CONFIGURAR MI SISTEMA DE BOMBEO
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ELECTROBOMBAS SECTION ========== */}
      <section className="py-24 lg:py-32 bg-[#f8fafc]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#4059aa]">Sistemas de Bombeo</span>
              <h2
                className="font-extrabold tracking-tight text-[#171c21]"
                style={{ fontFamily: "var(--font-manrope)", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
              >
                ELECTROBOMBAS DISPONIBLES
              </h2>
            </div>
            <Link
              href="/bombas"
              className="group flex items-center gap-2 text-sm font-extrabold text-[#006e0c] uppercase tracking-wider"
            >
              VER TODAS LAS BOMBAS
              <span className="w-8 h-[2px] bg-[#006e0c] group-hover:w-12 transition-all"></span>
            </Link>
          </div>

          {electrobombasCarousel.length > 0 && (
            <div className="mb-16">
              <ProductCarousel products={electrobombasCarousel} />
            </div>
          )}
        </div>
      </section>

      {/* ========== FILTROS SECTION ========== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#4059aa]">Protección de Activos</span>
              <h2
                className="font-extrabold tracking-tight text-[#171c21]"
                style={{ fontFamily: "var(--font-manrope)", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
              >
                SISTEMAS DE FILTRACIÓN AVANZADA
              </h2>
            </div>
            <Link
              href="/catalogo/filtros"
              className="group flex items-center gap-2 text-sm font-extrabold text-[#006e0c] uppercase tracking-wider"
            >
              VER TODOS LOS FILTROS
              <span className="w-8 h-[2px] bg-[#006e0c] group-hover:w-12 transition-all"></span>
            </Link>
          </div>

          {filtrosProducts.length > 0 && (
            <div className="mb-16">
              <ProductCarousel products={filtrosProducts} />
            </div>
          )}
        </div>
      </section>

      {/* ========== TRUST FEATURES ========== */}
      <section className="bg-[#f8fafc] py-24 border-y border-[#dee3ea]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="p-8 rounded-2xl bg-white border border-[#f1f5f9] hover:shadow-[0px_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 group">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-[#f0fdf4] text-[#006e0c] mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm"
                >
                  {f.icon}
                </div>
                <h3
                  className="font-extrabold mb-3 text-[#1e293b]"
                  style={{ fontFamily: "var(--font-manrope)", fontSize: 20 }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PUMP BRANDS MODULE ========== */}
      <PumpBrands />

      {/* ========== FILTROS AUTOMATICOS LOGOS ========== */}
      <BrandCarousel />

      {/* ========== PRODUCTOS DESTACADOS ========== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#4059aa]">Selección Hidra</span>
            <h2
              className="font-extrabold tracking-tight text-[#171c21]"
              style={{ fontFamily: "var(--font-manrope)", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              EQUIPOS DESTACADOS DEL MES
            </h2>
            <p className="text-[#64748b] text-lg font-medium">
              Soluciones probadas en terreno con el mejor respaldo técnico del mercado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          
          <div className="text-center mt-20">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center px-12 py-4 bg-[#1e293b] text-white font-bold rounded-base hover:bg-black transition-all shadow-xl shadow-slate-200"
            >
              VER CATÁLOGO COMPLETO
            </Link>
          </div>
        </div>
      </section>

      {/* ========== NUESTRAS LÍNEAS DE PRODUCTO ========== */}
      <section className="py-24 lg:py-32 bg-[#f8fafc] border-y border-[#dee3ea]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <h2
                  className="font-extrabold tracking-tight text-[#171c21] uppercase"
                  style={{ fontFamily: "var(--font-manrope)", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                >
                  NUESTRAS LÍNEAS DE PRODUCTO
                </h2>
                <div className="w-16 h-1 bg-[#4059aa] rounded-full"></div>
              </div>
              <CategoryRectSlider categories={categorySlides} />
            </div>

            <div className="lg:col-span-4 h-full">
              <Link href="/catalogo" className="group relative block h-full min-h-[400px] overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 hover:shadow-emerald-900/10 border border-[#dee3ea]">
                <Image
                  src="/images/consulta-catalogo.webp" 
                  alt="Consulta nuestro catálogo"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 space-y-4">
                  <span className="text-[10px] font-extrabold text-[#53b94a] uppercase tracking-[0.3em]">RECURSOS TÉCNICOS</span>
                  <h3 className="text-white text-2xl font-extrabold tracking-tight">CATÁLOGO DE <br />SOLUCIONES 2024</h3>
                  <div className="inline-flex items-center gap-3 text-white text-xs font-bold border-b border-white/30 pb-2 group-hover:border-white transition-all">
                    SOLICITAR INFORMACIÓN
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT / CTA ========== */}
      <section className="relative py-24 overflow-hidden bg-[#006e0c]">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-white font-extrabold tracking-tight text-3xl lg:text-5xl" style={{ fontFamily: "var(--font-manrope)" }}>
              ¿NECESITA UNA COTIZACIÓN?
            </h2>
            <p className="text-emerald-100 text-lg lg:text-xl max-w-2xl mx-auto font-medium">
              Contáctenos para recibir una propuesta a la medida de sus necesidades hidráulicas.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <a
              href="https://wa.me/56997107845"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-5 bg-white text-[#006e0c] font-extrabold rounded-base transition-all hover:-translate-y-1 shadow-2xl shadow-black/20"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.893-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.89-11.893 11.89-.199 0-.399-.012-.593-.035l-6.191 1.621c-.482.126-.957.172-1.422.172-.857 0-1.611-.253-2.146-.732-.489-.439-.817-1.129-.734-2.005zm4.032-5.753l-.248.437c-1.01 1.772-1.545 3.812-1.545 5.894 0 .438.163.812.441 1.062.242.244.629.404 1.157.301l4.437-1.162.483.287c1.3.774 2.766 1.182 4.28 1.182 5.674 0 10.291-4.616 10.291-10.291s-4.617-10.291-10.291-10.291c-5.676 0-10.292 4.616-10.292 10.291 0 1.838.537 3.633 1.554 5.188l.288.439-1.135 4.144 4.331-1.132z" />
              </svg>
              HABLAR CON HIDRA
            </a>
            
            <div className="flex flex-col items-center lg:items-start text-emerald-50 gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Oficina Principal</span>
              <a href="tel:+56227238788" className="text-xl font-extrabold hover:text-white transition-colors">+56 2 2723 8788</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
