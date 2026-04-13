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
      className="group bg-white flex flex-col overflow-hidden transition-shadow duration-200 hover:shadow-md"
      style={{ border: "1px solid #e0e0e0" }}
    >
      {/* Image */}
      <Link href={productUrl}>
        <div
          className="relative h-44 bg-white flex items-center justify-center overflow-hidden"
        >
          {imgSrc ? (
            <ProductImage
              src={imgSrc}
              alt={product.nombre}
              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-5xl opacity-20">💧</div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-1.5">
        <Link href={productUrl}>
          <h3
            className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-[#53B94A] transition-colors"
            style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
          >
            {product.nombre}
          </h3>
        </Link>

        {product.descripcionCorta && (
          <p className="text-xs text-[#7A7A7A] leading-snug line-clamp-2">
            {product.descripcionCorta}
          </p>
        )}

        {/* Specs chips */}
        {hasSpecs && (
          <div className="flex flex-wrap gap-1 mt-1">
            {product.hp.slice(0, 3).map((h) => (
              <span key={h} className="text-xs px-1.5 py-0.5 rounded bg-[#F3F8F3] text-[#53B94A] font-semibold">
                {h} HP
              </span>
            ))}
            {product.voltaje.slice(0, 2).map((v) => (
              <span key={v} className="text-xs px-1.5 py-0.5 rounded bg-[#F3F8F3] text-[#7A7A7A] font-semibold">
                {v}V
              </span>
            ))}
          </div>
        )}

        {/* Price (Bombas only) */}
        {showPrice && (
          <p className="font-bold text-sm mt-auto" style={{ color: "#53B94A", fontFamily: "var(--font-nunito)" }}>
            {formatPrice(product.precio)}
            <span className="text-xs font-normal text-[#7A7A7A] ml-1">+ IVA</span>
          </p>
        )}

        {/* Actions */}
        <div className={`${showPrice ? "" : "mt-auto"} pt-2 flex gap-1.5`}>
          <Link
            href={productUrl}
            className="flex-1 block text-center text-xs font-semibold py-1.5 px-2 rounded transition-colors"
            style={{ backgroundColor: "#F3F8F3", color: "#54595F" }}
          >
            Ver
          </Link>
          <AddToCartButton product={product} className="flex-1" />
        </div>
      </div>
    </div>
  );
}
