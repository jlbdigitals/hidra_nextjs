import Link from "next/link";
import type { Product } from "@/lib/products";
import { getProductImageSrc, getProductSlug } from "@/lib/products";
import { isVenta, formatPrice } from "@/lib/cart";
import ProductImage from "@/components/ProductImage";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const hasSpecs = product.hp.length > 0 || product.voltaje.length > 0;
  const imgSrc = getProductImageSrc(product);
  const showPrice = isVenta(product.topCategoria) && product.precio > 0;
  const productUrl = `/productos/${getProductSlug(product)}`;

  return (
    <div
      className="group bg-white flex flex-col overflow-hidden transition-all duration-500 hover:shadow-[0px_30px_60px_rgba(0,0,0,0.06)] border border-slate-100 rounded-[32px] h-full"
    >
      {/* Image Container */}
      <Link href={productUrl} className="block relative aspect-[4/3] bg-white flex items-center justify-center overflow-hidden border-b border-slate-50">
        {imgSrc ? (
          <ProductImage
            src={imgSrc}
            alt={product.nombre}
            className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="text-6xl opacity-10">💧</div>
        )}
        
        {product.topCategoria && (
           <div className="absolute top-4 left-4">
             <span className="text-[9px] font-extrabold uppercase tracking-widest bg-white/80 backdrop-blur-sm text-slate-400 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
               {product.topCategoria}
             </span>
           </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-7 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#4059aa]">
              {product.marca || "Industrial"}
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-200"></div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              V-SERIES
            </span>
          </div>
          <Link href={productUrl} className="block">
            <h3
              className="font-extrabold text-lg leading-[1.3] line-clamp-2 text-[#1e293b] group-hover:text-[#006e0c] transition-colors"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {product.nombre}
            </h3>
          </Link>
        </div>

        {/* Specs chips */}
        {hasSpecs && (
          <div className="flex flex-wrap gap-2">
            {product.hp.slice(0, 1).map((h) => (
              <div key={h} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:border-[#006e0c]/20 transition-colors">
                <svg className="w-3 h-3 text-[#006e0c]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a2 2 0 002 2 2 2 0 002-2z" />
                </svg>
                <span className="text-[11px] font-extrabold text-[#1e293b]">{h} HP</span>
              </div>
            ))}
            {product.voltaje.slice(0, 1).map((v) => (
              <div key={v} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:border-[#4059aa]/20 transition-colors">
                 <svg className="w-3 h-3 text-[#4059aa]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span className="text-[11px] font-extrabold text-[#1e293b]">{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* Price & Actions */}
        <div className="mt-auto pt-6 flex flex-col gap-4">
          {showPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#006e0c]" style={{ fontFamily: "var(--font-manrope)" }}>
                {formatPrice(product.precio)}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IVA Incl.</span>
            </div>
          ) : (
             <div className="h-8 flex items-center">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Precio por cotizar</span>
             </div>
          )}

          <div className="flex gap-3">
            <Link
              href={productUrl}
              className="flex-1 flex items-center justify-center text-[11px] font-extrabold uppercase tracking-widest py-4 px-4 rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-all border border-slate-100"
            >
              Ficha Técnica
            </Link>
            <AddToCartButton product={product} className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
