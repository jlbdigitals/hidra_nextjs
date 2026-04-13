export const dynamic = "force-dynamic";

export default function ConfiguracionPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Configuración</h1>
        <p className="text-gray-400 text-sm">Ajustes del sitio y Bombas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site info */}
        <div
          className="rounded-lg p-6"
          style={{ backgroundColor: "#252545", border: "1px solid #333360" }}
        >
          <h2 className="text-base font-semibold text-white mb-4">Información del sitio</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Nombre del sitio
              </label>
              <input
                type="text"
                defaultValue="Hidra"
                className="w-full px-3 py-2 text-sm rounded text-white"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #333360" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Descripción
              </label>
              <input
                type="text"
                defaultValue="Distribuidores de bombas de agua y filtros"
                className="w-full px-3 py-2 text-sm rounded text-white"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #333360" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Email de contacto
              </label>
              <input
                type="email"
                defaultValue="contacto@hidra.cl"
                className="w-full px-3 py-2 text-sm rounded text-white"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #333360" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                defaultValue="+56 9 9710 7845"
                className="w-full px-3 py-2 text-sm rounded text-white"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #333360" }}
              />
            </div>
          </div>
          <button
            className="mt-5 px-4 py-2 rounded text-sm font-semibold text-white"
            style={{ backgroundColor: "#53B94A" }}
          >
            Guardar cambios
          </button>
        </div>

        {/* Security */}
        <div
          className="rounded-lg p-6"
          style={{ backgroundColor: "#252545", border: "1px solid #333360" }}
        >
          <h2 className="text-base font-semibold text-white mb-4">Seguridad</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Contraseña actual
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm rounded text-white"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #333360" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Nueva contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm rounded text-white"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #333360" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Confirmar nueva contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm rounded text-white"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #333360" }}
              />
            </div>
            <p className="text-xs text-gray-500">
              La contraseña se configura mediante la variable de entorno{" "}
              <code className="text-gray-300">ADMIN_PASSWORD</code> en el servidor.
            </p>
          </div>
        </div>

        {/* Social links */}
        <div
          className="rounded-lg p-6"
          style={{ backgroundColor: "#252545", border: "1px solid #333360" }}
        >
          <h2 className="text-base font-semibold text-white mb-4">Redes sociales</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                WhatsApp
              </label>
              <input
                type="text"
                defaultValue="56997107845"
                className="w-full px-3 py-2 text-sm rounded text-white"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #333360" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Facebook
              </label>
              <input
                type="url"
                placeholder="https://facebook.com/..."
                className="w-full px-3 py-2 text-sm rounded text-white"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #333360" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Instagram
              </label>
              <input
                type="url"
                placeholder="https://instagram.com/..."
                className="w-full px-3 py-2 text-sm rounded text-white"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #333360" }}
              />
            </div>
          </div>
          <button
            className="mt-5 px-4 py-2 rounded text-sm font-semibold text-white"
            style={{ backgroundColor: "#53B94A" }}
          >
            Guardar cambios
          </button>
        </div>

        {/* System info */}
        <div
          className="rounded-lg p-6"
          style={{ backgroundColor: "#252545", border: "1px solid #333360" }}
        >
          <h2 className="text-base font-semibold text-white mb-4">Información del sistema</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Versión</span>
              <span className="text-white font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Framework</span>
              <span className="text-white font-medium">Next.js App Router</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Productos</span>
              <span className="text-white font-medium">641</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Almacenamiento</span>
              <span className="text-white font-medium">JSON (archivo)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
