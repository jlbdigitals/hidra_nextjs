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
  const allProductsRaw = getProducts().filter(
    (p) => p.publicado && isRealProduct(p) && isVenta(p.topCategoria) && p.precio > 0
  );

  // All saleable Bombas
  const allProducts = allProductsRaw; // Remove deduplication for now to ensure all categories are detected

  // Build brand → series map for sidebar
  const brandMap = new Map<string, Set<string>>();
  for (const p of allProducts) {
    const brand = p.marca || "Otras";
    if (!brandMap.has(brand)) brandMap.set(brand, new Set());
    
    // Categorize Pedrollo series by name if not explicitly set
    if (brand === "Pedrollo") {
      if (p.nombre.includes("PKSm") || p.nombre.includes("PKS ")) brandMap.get(brand)!.add("Serie PKS");
      else if (p.nombre.includes("PKm") || p.nombre.includes("PK ")) brandMap.get(brand)!.add("Serie PK");
      else if (p.nombre.includes("CKm") || p.nombre.includes("CKR") || p.nombre.includes("CK ")) brandMap.get(brand)!.add("Serie CK");
      else if (p.nombre.includes("JSW") || p.nombre.includes("JSW/")) brandMap.get(brand)!.add("Serie JSW");
      else if (p.nombre.includes("Plurijet")) brandMap.get(brand)!.add("Serie Plurijet");
      else if (p.nombre.includes("JDW")) brandMap.get(brand)!.add("Serie JDW");
      else if (p.nombre.includes("Future JET")) brandMap.get(brand)!.add("Serie Future JET");
      else if (p.nombre.includes("CPm") || p.nombre.includes("CP ")) brandMap.get(brand)!.add("Serie CP");
      else if (p.nombre.includes("NGAm") || p.nombre.includes("NGA ")) brandMap.get(brand)!.add("Serie NGA");
      else if (p.nombre.includes("HFm") || p.nombre.includes("HF ")) brandMap.get(brand)!.add("Serie HF");
      else if (p.nombre.includes("2CPm") || p.nombre.includes("2CP ")) brandMap.get(brand)!.add("Serie 2CP");
      else if (p.nombre.includes("3CP") || p.nombre.includes("4CP")) brandMap.get(brand)!.add("Serie 3-4CP");
      else if (p.nombre.includes("3CR") || p.nombre.includes("4CR") || p.nombre.includes("5CR")) brandMap.get(brand)!.add("Serie 3-4-5CR");
      else if (p.nombre.includes("FCR")) brandMap.get(brand)!.add("Serie FCR");
      else if (p.nombre.includes(" Fm")) brandMap.get(brand)!.add("Serie FM");
      else if (p.nombre.includes(" F")) brandMap.get(brand)!.add("Serie F");
      else if (p.nombre.includes(" PQ")) brandMap.get(brand)!.add("Serie PQ");
      else if (p.nombre.includes(" PVm") || p.nombre.includes(" PV ")) brandMap.get(brand)!.add("Serie PV");
      else if (p.nombre.includes("SKR")) brandMap.get(brand)!.add("Serie SKR");
      else if (p.nombre.includes("TURBO")) brandMap.get(brand)!.add("Serie TURBO");
    }

    if (brand === "Calpeda") {
      if (p.nombre.includes("CTM")) brandMap.get(brand)!.add("Serie CTM");
      else if (p.nombre.includes(" T ") || p.nombre.includes(" TM ") || p.nombre.includes(" TP ") || p.nombre.includes(" TPM ")) {
        brandMap.get(brand)!.add("Serie T-TM-TP");
      }
      else if (p.nombre.includes(" NM ") || p.nombre.includes(" NMM ")) {
        brandMap.get(brand)!.add("Serie NM-NMM");
      }
      else if (p.nombre.includes(" MXH ") || p.nombre.includes(" MXHM ")) {
        brandMap.get(brand)!.add("Serie MXH-MXHM");
      }
      else if (p.nombre.includes(" NMD ")) {
        brandMap.get(brand)!.add("Serie NMD");
      }
      else if (p.nombre.includes(" MXPM ")) {
        brandMap.get(brand)!.add("Serie MXPM");
      }
      else if (p.nombre.includes(" NGLM ")) {
        brandMap.get(brand)!.add("Serie NGLM");
      }
      else if (p.nombre.includes(" NGX ") || p.nombre.includes(" NGXM ")) {
        brandMap.get(brand)!.add("Serie NGX");
      }
      else if (p.nombre.includes(" Meta ")) {
        brandMap.get(brand)!.add("Serie META");
      }
    }

    if (brand === "Reggio") {
      if (p.nombre.includes(" SP")) brandMap.get(brand)!.add("Serie SP");
      else if (p.nombre.includes(" Stal ")) brandMap.get(brand)!.add("Serie STAL");
      else if (p.nombre.includes(" SM1 ")) brandMap.get(brand)!.add("Serie SM1");
      else if (p.nombre.includes(" SM ")) brandMap.get(brand)!.add("Serie SM");
      else if (p.nombre.includes(" STM ")) brandMap.get(brand)!.add("Serie STM");
      else if (p.nombre.includes(" CF ") || p.nombre.includes(" CFM ")) brandMap.get(brand)!.add("Serie CF-CFM");
      else if (p.nombre.includes(" SCF1 ") || p.nombre.includes(" SCF2 ") || p.nombre.includes(" SCF4 ")) brandMap.get(brand)!.add("Serie SCF");
      else if (p.nombre.includes(" STC ") || p.nombre.includes(" STCF3 ")) brandMap.get(brand)!.add("Serie STC-STCF");
      else if (p.nombre.includes(" STO ") || p.nombre.includes(" STOA ")) brandMap.get(brand)!.add("Serie STO-STOA");
      else if (p.nombre.includes(" SSOA ")) brandMap.get(brand)!.add("Serie SSOA");
      else if (p.nombre.includes(" SSBJ ")) brandMap.get(brand)!.add("Serie SSBJ");
      else if (p.nombre.includes(" STBJ ")) brandMap.get(brand)!.add("Serie STBJ");
      else if (p.nombre.includes(" SB1 ") || p.nombre.includes(" SB2 ") || p.nombre.includes(" SB3 ")) brandMap.get(brand)!.add("Serie SB");
      else if (p.nombre.includes(" SJ 100 ") || p.nombre.includes(" SJ 200 ")) brandMap.get(brand)!.add("Serie SJ");
      else if (p.nombre.includes(" SJX ")) brandMap.get(brand)!.add("Serie SJX");
      else if (p.nombre.includes(" HG ") || p.nombre.includes(" HGM ")) brandMap.get(brand)!.add("Serie HG-HGM");
      else if (p.nombre.includes(" SA 100 ") || p.nombre.includes(" SA 80 ")) brandMap.get(brand)!.add("Serie SA");
      else if (p.nombre.includes(" SN 32-") || p.nombre.includes(" SN 40-") || p.nombre.includes(" SN 50-") || p.nombre.includes(" SN 65-") || p.nombre.includes(" SN 80-")) brandMap.get(brand)!.add("Serie SN");
    }

    if (brand === "Bestflow") {
      if (p.nombre.includes(" 2CDC ")) brandMap.get(brand)!.add("Serie 2CDC");
      else if (p.nombre.includes(" BCA ")) brandMap.get(brand)!.add("Serie BCA");
      else if (p.nombre.includes(" BMB ")) brandMap.get(brand)!.add("Serie BMB");
      else if (p.nombre.includes(" BTC")) brandMap.get(brand)!.add("Serie BTC");
      else if (p.nombre.includes(" BTDPM")) brandMap.get(brand)!.add("Serie BTDM");
      else if (p.nombre.includes(" BTG")) brandMap.get(brand)!.add("Serie BTG");
      else if (p.nombre.includes(" BTJ")) brandMap.get(brand)!.add("Serie BTJ");
      else if (p.nombre.includes(" BTMU")) brandMap.get(brand)!.add("Serie BTMU");
      else if (p.nombre.includes(" DWO ")) brandMap.get(brand)!.add("Serie DWO");
      else if (p.nombre.includes(" GTP ")) brandMap.get(brand)!.add("Serie GTP");
      else if (p.nombre.includes(" BTPm ")) brandMap.get(brand)!.add("Serie BTP");
    }

    // Also use existing categories
    for (const c of p.categorias) {
      const parts = c.split(" > ");
      if (parts[0] === "Bombas" && parts.length >= 3 && parts[1] === brand) {
        brandMap.get(brand)!.add(parts[2]);
      }
    }
  }

  const brandList = Array.from(brandMap.entries())
    .filter(([brand]) => ["Pedrollo", "Calpeda", "Reggio", "Bestflow"].includes(brand))
    .sort(([a], [b]) => {
      const order = ["Pedrollo", "Calpeda", "Reggio", "Bestflow"];
      return order.indexOf(a) - order.indexOf(b);
    })
    .map(([brand, seriesSet]) => {
      let series = Array.from(seriesSet);
      
      if (brand === "Pedrollo") {
        const allowed = ["Serie PK", "Serie PKS", "Serie CK", "Serie JSW", "Serie Plurijet", "Serie JDW", "Serie Future JET", "Serie CP", "Serie NGA", "Serie HF", "Serie 2CP", "Serie 3-4CP", "Serie 3-4-5CR", "Serie FCR", "Serie FM", "Serie F", "Serie PQ", "Serie PV", "Serie SKR", "Serie TURBO"];
        // Ensure our target series are present if there are products
        allowed.forEach(s => {
          if (!series.includes(s)) {
            const pattern = s.replace("Serie ", "");
            if (allProducts.some(p => p.marca === "Pedrollo" && (p.nombre.includes(pattern) || p.categorias.some(c => c.includes(s))))) {
              series.push(s);
            }
          }
        });
        series = series.filter(s => allowed.includes(s));
      }

      if (brand === "Calpeda") {
        const allowed = ["Serie CTM", "Serie T-TM-TP", "Serie NM-NMM", "Serie MXH-MXHM", "Serie NMD", "Serie MXPM", "Serie NGLM", "Serie NGX", "Serie META"];
        allowed.forEach(s => {
          if (!series.includes(s)) {
            const pattern = s.replace("Serie ", "");
            if (allProducts.some(p => p.marca === "Calpeda" && (p.nombre.includes(pattern) || p.categorias.some(c => c.includes(s))))) {
              series.push(s);
            }
          }
        });
        series = series.filter(s => allowed.includes(s));
      }

      if (brand === "Reggio") {
        const allowed = ["Serie SP", "Serie STAL", "Serie SM", "Serie SM1", "Serie STM", "Serie CF-CFM", "Serie SCF", "Serie STC-STCF", "Serie STO-STOA", "Serie SSOA", "Serie SSBJ", "Serie STBJ", "Serie SB", "Serie SJ", "Serie SJX", "Serie HG-HGM", "Serie SA", "Serie SN"];
        allowed.forEach(s => {
          if (!series.includes(s)) {
            const pattern = s.replace("Serie ", "");
            if (allProducts.some(p => p.marca === "Reggio" && (p.nombre.includes(pattern) || p.categorias.some(c => c.includes(s))))) {
              series.push(s);
            }
          }
        });
        series = series.filter(s => allowed.includes(s));
      }

      if (brand === "Bestflow") {
        const allowed = ["Serie 2CDC", "Serie BCA", "Serie BMB", "Serie BTC", "Serie BTDM", "Serie BTG", "Serie BTJ", "Serie BTMU", "Serie DWO", "Serie GTP", "Serie BTP"];
        allowed.forEach(s => {
          if (!series.includes(s)) {
            const pattern = s.replace("Serie ", "");
            const searchPattern = pattern === "BTDM" ? "BTDPM" : pattern;
            if (allProducts.some(p => p.marca === "Bestflow" && (p.nombre.includes(` ${searchPattern}`) || p.categorias.some(c => c.includes(s))))) {
              series.push(s);
            }
          }
        });
        series = series.filter(s => allowed.includes(s));
      }

      return {
        brand,
        series: series.sort((a, b) => {
          const pedrolloOrder = ["Serie PK", "Serie PKS", "Serie CK", "Serie JSW", "Serie Plurijet", "Serie JDW", "Serie Future JET", "Serie CP", "Serie NGA", "Serie HF", "Serie 2CP", "Serie 3-4CP", "Serie 3-4-5CR", "Serie FCR", "Serie FM", "Serie F", "Serie PQ", "Serie PV", "Serie SKR", "Serie TURBO"];
          const calpedaOrder = ["Serie CTM", "Serie T-TM-TP", "Serie NM-NMM", "Serie MXH-MXHM", "Serie NMD", "Serie MXPM", "Serie NGLM", "Serie NGX", "Serie META"];
          const reggioOrder = ["Serie SP", "Serie STAL", "Serie SM", "Serie SM1", "Serie STM", "Serie CF-CFM", "Serie SCF", "Serie STC-STCF", "Serie STO-STOA", "Serie SSOA", "Serie SSBJ", "Serie STBJ", "Serie SB", "Serie SJ", "Serie SJX", "Serie HG-HGM", "Serie SA", "Serie SN"];
          const bestflowOrder = ["Serie 2CDC", "Serie BCA", "Serie BMB", "Serie BTC", "Serie BTDM", "Serie BTG", "Serie BTJ", "Serie BTMU", "Serie DWO", "Serie GTP", "Serie BTP"];
          
          const order = brand === "Pedrollo" ? pedrolloOrder : brand === "Calpeda" ? calpedaOrder : brand === "Reggio" ? reggioOrder : brand === "Bestflow" ? bestflowOrder : [];
          const idxA = order.indexOf(a);
          const idxB = order.indexOf(b);
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
          if (idxA !== -1) return -1;
          if (idxB !== -1) return 1;
          return a.localeCompare(b);
        }),
      };
    });

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
      p.marca === marca || p.categorias.some((c) => c.includes(`> ${marca}`))
    );
  }
  if (serie) {
    filtered = filtered.filter((p) => {
      // Direct category match
      const catMatch = p.categorias.some((c) => c.includes(`> ${serie}`));
      if (catMatch) return true;

      // Smart match by name for Pedrollo series
      if (marca === "Pedrollo") {
        if (serie === "Serie PK" && (p.nombre.includes("PKm") || p.nombre.includes("PK "))) return true;
        if (serie === "Serie PKS" && (p.nombre.includes("PKSm") || p.nombre.includes("PKS "))) return true;
        if (serie === "Serie CK" && (p.nombre.includes("CKm") || p.nombre.includes("CKR") || p.nombre.includes("CK "))) return true;
        if (serie === "Serie JSW" && (p.nombre.includes("JSW") || p.nombre.includes("JSW/"))) return true;
        if (serie === "Serie Plurijet" && p.nombre.includes("Plurijet")) return true;
        if (serie === "Serie JDW" && p.nombre.includes("JDW")) return true;
        if (serie === "Serie Future JET" && p.nombre.includes("Future JET")) return true;
        if (serie === "Serie CP" && (p.nombre.includes("CPm") || p.nombre.includes("CP "))) return true;
        if (serie === "Serie NGA" && (p.nombre.includes("NGAm") || p.nombre.includes("NGA "))) return true;
        if (serie === "Serie HF" && (p.nombre.includes("HFm") || p.nombre.includes("HF "))) return true;
        if (serie === "Serie 2CP" && (p.nombre.includes("2CPm") || p.nombre.includes("2CP "))) return true;
        if (serie === "Serie 3-4CP" && (p.nombre.includes("3CP") || p.nombre.includes("4CP"))) return true;
        if (serie === "Serie 3-4-5CR" && (p.nombre.includes("3CR") || p.nombre.includes("4CR") || p.nombre.includes("5CR"))) return true;
        if (serie === "Serie FCR" && (p.nombre.includes("FCR"))) return true;
        if (serie === "Serie FM" && (p.nombre.includes(" Fm"))) return true;
        if (serie === "Serie F" && p.nombre.includes(" F") && !p.nombre.includes(" Fm") && !p.nombre.includes(" FCR")) return true;
        if (serie === "Serie PQ" && p.nombre.includes(" PQ")) return true;
        if (serie === "Serie PV" && (p.nombre.includes(" PVm") || p.nombre.includes(" PV "))) return true;
        if (serie === "Serie SKR" && p.nombre.includes("SKR")) return true;
        if (serie === "Serie TURBO" && p.nombre.includes("TURBO")) return true;
      }

      if (marca === "Calpeda") {
        if (serie === "Serie CTM" && p.nombre.includes("CTM")) return true;
        if (serie === "Serie T-TM-TP" && (p.nombre.includes(" T ") || p.nombre.includes(" TM ") || p.nombre.includes(" TP ") || p.nombre.includes(" TPM "))) return true;
        if (serie === "Serie NM-NMM" && (p.nombre.includes(" NM ") || p.nombre.includes(" NMM "))) return true;
        if (serie === "Serie MXH-MXHM" && (p.nombre.includes(" MXH ") || p.nombre.includes(" MXHM "))) return true;
        if (serie === "Serie NMD" && p.nombre.includes(" NMD ")) return true;
        if (serie === "Serie MXPM" && p.nombre.includes(" MXPM ")) return true;
        if (serie === "Serie NGLM" && p.nombre.includes(" NGLM ")) return true;
        if (serie === "Serie NGX" && (p.nombre.includes(" NGX ") || p.nombre.includes(" NGXM "))) return true;
        if (serie === "Serie META" && p.nombre.includes(" Meta ")) return true;
      }

      if (marca === "Reggio") {
        if (serie === "Serie SP" && p.nombre.includes(" SP")) return true;
        if (serie === "Serie STAL" && p.nombre.includes(" Stal ")) return true;
        if (serie === "Serie SM" && p.nombre.includes(" SM ")) return true;
        if (serie === "Serie SM1" && p.nombre.includes(" SM1 ")) return true;
        if (serie === "Serie STM" && p.nombre.includes(" STM ")) return true;
        if (serie === "Serie CF-CFM" && (p.nombre.includes(" CF ") || p.nombre.includes(" CFM "))) return true;
        if (serie === "Serie SCF" && (p.nombre.includes(" SCF1 ") || p.nombre.includes(" SCF2 ") || p.nombre.includes(" SCF4 "))) return true;
        if (serie === "Serie STC-STCF" && (p.nombre.includes(" STC ") || p.nombre.includes(" STCF3 "))) return true;
        if (serie === "Serie STO-STOA" && (p.nombre.includes(" STO ") || p.nombre.includes(" STOA "))) return true;
        if (serie === "Serie SSOA" && p.nombre.includes(" SSOA ")) return true;
        if (serie === "Serie SSBJ" && p.nombre.includes(" SSBJ ")) return true;
        if (serie === "Serie STBJ" && p.nombre.includes(" STBJ ")) return true;
        if (serie === "Serie SB" && (p.nombre.includes(" SB1 ") || p.nombre.includes(" SB2 ") || p.nombre.includes(" SB3 "))) return true;
        if (serie === "Serie SJ" && (p.nombre.includes(" SJ 100 ") || p.nombre.includes(" SJ 200 "))) return true;
        if (serie === "Serie SJX" && p.nombre.includes(" SJX ")) return true;
        if (serie === "Serie HG-HGM" && (p.nombre.includes(" HG ") || p.nombre.includes(" HGM "))) return true;
        if (serie === "Serie SA" && (p.nombre.includes(" SA 100 ") || p.nombre.includes(" SA 80 "))) return true;
        if (serie === "Serie SN" && (p.nombre.includes(" SN 32-") || p.nombre.includes(" SN 40-") || p.nombre.includes(" SN 50-") || p.nombre.includes(" SN 65-") || p.nombre.includes(" SN 80-"))) return true;
      }

      if (marca === "Bestflow") {
        if (serie === "Serie 2CDC" && p.nombre.includes(" 2CDC ")) return true;
        if (serie === "Serie BCA" && p.nombre.includes(" BCA ")) return true;
        if (serie === "Serie BMB" && p.nombre.includes(" BMB ")) return true;
        if (serie === "Serie BTC" && p.nombre.includes(" BTC")) return true;
        if (serie === "Serie BTDM" && p.nombre.includes(" BTDPM")) return true;
        if (serie === "Serie BTG" && p.nombre.includes(" BTG")) return true;
        if (serie === "Serie BTJ" && p.nombre.includes(" BTJ")) return true;
        if (serie === "Serie BTMU" && p.nombre.includes(" BTMU")) return true;
        if (serie === "Serie DWO" && p.nombre.includes(" DWO ")) return true;
        if (serie === "Serie GTP" && p.nombre.includes(" GTP ")) return true;
        if (serie === "Serie BTP" && p.nombre.includes(" BTPm ")) return true;
      }
      return false;
    });
  }
  if (hp) {
    if (hp === "0-1") {
      filtered = filtered.filter((p) => p.hp.some((h) => {
        const val = parseFloat(h);
        return val >= 0 && val <= 1;
      }));
    } else if (hp === "1-10") {
      filtered = filtered.filter((p) => p.hp.some((h) => {
        const val = parseFloat(h);
        return val > 1 && val <= 10;
      }));
    } else if (hp === "10-100") {
      filtered = filtered.filter((p) => p.hp.some((h) => {
        const val = parseFloat(h);
        return val > 10 && val <= 100;
      }));
    } else {
      filtered = filtered.filter((p) => p.hp.includes(hp));
    }
  }
  if (voltaje) {
    if (voltaje === "monofasica") {
      filtered = filtered.filter((p) => p.voltaje.some((v) => parseInt(v) < 380));
    } else if (voltaje === "trifasica") {
      filtered = filtered.filter((p) => p.voltaje.some((v) => parseInt(v) >= 380));
    } else {
      filtered = filtered.filter((p) => p.voltaje.includes(voltaje));
    }
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

  const voltajeLabel =
    voltaje === "monofasica"
      ? "Monofásica"
      : voltaje === "trifasica"
      ? "Trifásica"
      : voltaje
      ? `${voltaje}V`
      : null;

  const hpLabel =
    hp === "0-1"
      ? "0 a 1 HP"
      : hp === "1-10"
      ? "1 a 10 HP"
      : hp === "10-100"
      ? "10 a 100 HP"
      : hp
      ? `${hp} HP`
      : null;

  const activeFilters = [
    marca,
    serie,
    hpLabel,
    voltajeLabel,
  ].filter(Boolean);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative pt-32 pb-20 overflow-hidden bg-[#0f172a]">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#006e0c]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#4059aa]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50 mb-6">
            <Link href="/" className="hover:text-[#006e0c] transition-colors">Inicio</Link>
            <span className="text-white/20">/</span>
            <span className="text-white">Bombas</span>
          </nav>
          <div className="max-w-2xl">
            <h1
              className="text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Soluciones en <span className="text-[#006e0c]">Bombeo</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              Bombas de alta eficiencia para riego, industria y hogar. Calidad garantizada de las mejores marcas globales.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="sticky top-28">
              <Suspense>
                <BombasSidebar
                  brands={brandList}
                  hpValues={hpValues}
                  voltajes={voltajes}
                />
              </Suspense>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-[#f1f5f9] gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-extrabold text-[#4059aa] uppercase tracking-[0.2em]">Resultados del Catálogo</span>
                <p className="text-sm text-[#64748b] font-medium">
                  {activeFilters.length > 0 ? (
                    <>
                      Mostrando <span className="text-[#1e293b] font-bold">{activeFilters.join(" • ")}</span>
                      <span className="mx-2 text-slate-300">|</span>
                    </>
                  ) : null}
                  <span className="text-[#1e293b] font-bold">{filtered.length}</span> productos encontrados
                </p>
              </div>
              
              {activeFilters.length > 0 && (
                <Link
                  href="/bombas"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#f1f5f9] rounded-full text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-widest hover:border-[#ef4444] hover:text-[#ef4444] transition-all shadow-sm"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpiar Filtros
                </Link>
              )}
            </div>

            {/* Grid */}
            {pageProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {pageProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-20 pt-10 border-t border-[#f1f5f9]">
                    {currentPage > 1 && (
                      <Link
                        href={pageHref(currentPage - 1)}
                        className="p-3 rounded-xl border border-[#f1f5f9] text-[#64748b] hover:bg-[#f8fafc] hover:border-[#cbd5e1] transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </Link>
                    )}
                    
                    <div className="flex items-center gap-1">
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
                            className={`w-11 h-11 flex items-center justify-center text-sm font-bold rounded-xl transition-all ${
                              n === currentPage
                                ? "bg-[#006e0c] text-white shadow-lg shadow-[#006e0c]/20 scale-110 z-10"
                                : "bg-white text-[#64748b] border border-[#f1f5f9] hover:border-[#cbd5e1] hover:text-[#1e293b]"
                            }`}
                            style={{ fontFamily: "var(--font-manrope)" }}
                          >
                            {n}
                          </Link>
                        );
                      })}
                    </div>

                    {currentPage < totalPages && (
                      <Link
                        href={pageHref(currentPage + 1)}
                        className="p-3 rounded-xl border border-[#f1f5f9] text-[#64748b] hover:bg-[#f8fafc] hover:border-[#cbd5e1] transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="py-24 text-center bg-[#f8fafc] rounded-3xl border border-dashed border-[#cbd5e1]">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg className="w-10 h-10 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1e293b] mb-2" style={{ fontFamily: "var(--font-manrope)" }}>Sin resultados</h3>
                <p className="text-[#64748b] mb-8 max-w-xs mx-auto">No encontramos productos que coincidan con los filtros seleccionados.</p>
                <Link 
                  href="/bombas" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#006e0c] text-white text-sm font-bold rounded-full hover:bg-[#005a0a] transition-all shadow-lg shadow-[#006e0c]/20"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Ver todo el catálogo
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
