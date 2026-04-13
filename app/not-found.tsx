import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div
        className="text-7xl font-bold mb-4"
        style={{ fontFamily: "var(--font-nunito)", color: "#53B94A" }}
      >
        404
      </div>
      <h1
        className="text-2xl font-bold mb-3"
        style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
      >
        Página no encontrada
      </h1>
      <p className="text-sm mb-8 max-w-md" style={{ color: "#7A7A7A" }}>
        La página que busca no existe o fue movida. Verifique la URL o regrese al inicio.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-2.5 rounded font-semibold text-sm text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#53B94A" }}
        >
          Ir al inicio
        </Link>
        <Link
          href="/productos"
          className="px-6 py-2.5 rounded font-semibold text-sm transition-colors"
          style={{ backgroundColor: "#F3F8F3", color: "#54595F", border: "1px solid #e0e0e0" }}
        >
          Ver productos
        </Link>
      </div>
    </div>
  );
}
