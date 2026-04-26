"use client";

import Image from "next/image";
import Link from "next/link";

const PUMP_BRANDS = [
  { name: "Pedrollo", img: "/uploads/bomba_pedrollo.jpg", href: "/bombas?marca=Pedrollo" },
  { name: "Calpeda", img: "/uploads/bomba_calpeda.jpg", href: "/bombas?marca=Calpeda" },
  { name: "Reggio", img: "/uploads/bomba_reggio.jpg", href: "/bombas?marca=Reggio" },
  { name: "Bestflow", img: "/uploads/bomba_bestflow.jpg", href: "/bombas?marca=Bestflow" },
];

export default function PumpBrands() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1140px] mx-auto px-4">
        <h2 
          className="text-center font-bold mb-12 uppercase"
          style={{ fontFamily: "var(--font-nunito-sans)", color: "#54595F", fontWeight: 700, fontSize: 28 }}
        >
          NUESTRAS MARCAS LÍDERES
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {PUMP_BRANDS.map((brand) => (
            <Link 
              key={brand.name}
              href={brand.href}
              className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-1"
            >
              <div className="relative w-full aspect-square bg-[#F3F8F3] rounded-lg overflow-hidden border border-[#e0e0e0] flex items-center justify-center p-4">
                <Image
                  src={brand.img}
                  alt={brand.name}
                  fill
                  className="object-contain p-6 transition-transform group-hover:scale-110"
                />
              </div>
              <span className="font-bold text-[#54595F] group-hover:text-[#53B94A] transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
