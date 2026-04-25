import { getProducts, getTopCategories } from '@/lib/products-server'
import AdminHeader from '../components/AdminHeader'
import ProductTable from '../components/ProductTable'

const PAGE_SIZE = 50

interface SearchParams {
  q?: string
  categoria?: string
  page?: string
}

export default async function AdminProductosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const { q = '', categoria = '', page = '1' } = params
  const currentPage = parseInt(page) || 1

  let products = getProducts()
  if (q) {
    const ql = q.toLowerCase()
    products = products.filter(
      (p) =>
        p.nombre.toLowerCase().includes(ql) ||
        p.categorias.some((c) => c.toLowerCase().includes(ql))
    )
  }
  if (categoria) {
    products = products.filter((p) => p.topCategoria === categoria)
  }

  const total = products.length
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const paged = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const topCats = getTopCategories()

  return (
    <div style={{ padding: '0 32px 40px' }}>
      <AdminHeader
        title="Productos"
        subtitle={`${total} productos`}
      />

      {/* Search */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <form method="GET" action="/admin/productos" style={{ display: 'flex', gap: 8, flex: 1, minWidth: 200 }}>
          <input name="categoria" type="hidden" value={categoria} />
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar por nombre o categoría..."
            style={{ flex: 1, border: '1px solid #c9cccf', borderRadius: 6, padding: '8px 12px', fontSize: 14, color: '#202223', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#53B94A', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Buscar
          </button>
        </form>
      </div>

      <ProductTable
        products={paged}
        topCats={topCats}
        q={q}
        categoria={categoria}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  )
}