import Link from "next/link";

export default function GraciasCotizarPage() {
  return (
    <div className="max-w-[1140px] mx-auto px-4 py-24 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-[#F3F8F3] text-[#53B94A] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: "#54595F", fontFamily: "var(--font-nunito)" }}>
          ¡Gracias por tu solicitud!
        </h1>
        
        <p className="text-lg text-[#7A7A7A] mb-10 leading-relaxed">
          Hemos recibido tus datos correctamente. Un ejecutivo de <span className="font-bold text-[#53B94A]">Hidra Equipos</span> se pondrá en contacto contigo a la brevedad para brindarte la mejor asesoría.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/bombas" 
            className="px-8 py-3.5 bg-[#53B94A] text-white font-bold rounded-lg shadow-md hover:bg-[#46a13e] transition-all hover:scale-105"
          >
            Ver más productos
          </Link>
          <Link 
            href="/" 
            className="px-8 py-3.5 border-2 border-[#e0e0e0] text-[#54595F] font-bold rounded-lg hover:bg-gray-50 transition-all"
          >
            Ir al inicio
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-[#f0f0f0]">
          <p className="text-sm text-[#aaa]">
            ¿Tienes una urgencia? Llámanos directamente al <br />
            <a href="tel:+56997107845" className="text-[#53B94A] font-bold hover:underline">+56 9 9710 7845</a>
          </p>
        </div>
      </div>
    </div>
  );
}
