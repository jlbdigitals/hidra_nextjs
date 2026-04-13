import { getProducts, getTopCategories } from '@/lib/products'
import AdminHeader from '../components/AdminHeader'
import Link from 'next/link'

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

  const S = {
    card: { backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e1e3e5', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
    th: { padding: '10px 16px', textAlign: 'left' as const, fontSize: 12, fontWeight: 600, color: '#6d7175', textTransform: 'uppercase' as const, letterSpacing: '0.05em', backgroundColor: '#f9fafb', borderBottom: '1px solid #e1e3e5' },
    td: { padding: '12px 16px', borderBottom: '1px solid #f4f6f8', fontSize: 14, color: '#202223', verticalAlign: 'middle' as const },
  }

  function buildUrl(overrides: Record<string, string>) {
    const p = new URLSearchParams({ q, categoria, page: String(currentPage), ...overrides })
    return `/admin/productos?${p.toString()}`
  }

  return (
    <div style={{ padding: '0 32px 40px' }}>
      <AdminHeader
        title="Productos"
        subtitle={`${total} productos`}
      />

      {/* Filters */}
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

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        <Link href={buildUrl({ categoria: '', page: '1' })}
          style={{ padding: '5px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600, textDecoration: 'none',
            backgroundColor: !categoria ? '#53B94A' : '#f4f6f8',
            color: !categoria ? '#fff' : '#6d7175',
            border: `1px solid ${!categoria ? '#53B94A' : '#e1e3e5'}` }}>
          Todas
        </Link>
        {topCats.map((cat) => (
          <Link key={cat} href={buildUrl({ categoria: cat, page: '1' })}
            style={{ padding: '5px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600, textDecoration: 'none',
              backgroundColor: categoria === cat ? '#53B94A' : '#f4f6f8',
              color: categoria === cat ? '#fff' : '#6d7175',
              border: `1px solid ${categoria === cat ? '#53B94A' : '#e1e3e5'}` }}>
            {cat}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div style={S.card}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...S.th, width: 60 }}>Img</th>
              <th style={S.th}>Nombre</th>
              <th style={S.th}>Categoría</th>
              <th style={S.th}>HP</th>
              <th style={S.th}>Voltaje</th>
              <th style={{ ...S.th, textAlign: 'center' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((p) => (
              <tr key={p.id} style={{ cursor: 'pointer' }}>
                <td style={S.td}>
                  <div style={{ width: 40, height: 40, backgroundColor: '#F3F8F3', border: '1px solid #e0e0e0', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {(p.localImage || p.imagenUrl) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.localImage || p.imagenUrl.replace('http://hidra.local', '')} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : <span style={{ fontSize: 18 }}>💧</span>}
                  </div>
                </td>
                <td style={S.td}>
                  <Link href={`/admin/productos/${p.id}`} style={{ color: '#53B94A', fontWeight: 600, textDecoration: 'none', fontSize: 13 }}>
                    {p.nombre}
                  </Link>
                </td>
                <td style={{ ...S.td, color: '#6d7175', fontSize: 13 }}>{p.deepCategoria}</td>
                <td style={S.td}>
                  {p.hp.slice(0, 2).map((h) => (
                    <span key={h} style={{ display: 'inline-block', marginRight: 4, padding: '2px 6px', backgroundColor: '#F3F8F3', color: '#53B94A', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{h}</span>
                  ))}
                </td>
                <td style={S.td}>
                  {p.voltaje.slice(0, 2).map((v) => (
                    <span key={v} style={{ display: 'inline-block', marginRight: 4, padding: '2px 6px', backgroundColor: '#f4f6f8', color: '#6d7175', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{v}V</span>
                  ))}
                </td>
                <td style={{ ...S.td, textAlign: 'center' }}>
                  <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                    backgroundColor: p.publicado ? '#e3f5e1' : '#fef3cd',
                    color: p.publicado ? '#2d6a4f' : '#856404' }}>
                    {p.publicado ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, padding: '16px', borderTop: '1px solid #e1e3e5' }}>
            {currentPage > 1 && (
              <Link href={buildUrl({ page: String(currentPage - 1) })} style={{ padding: '6px 12px', border: '1px solid #c9cccf', borderRadius: 6, color: '#202223', textDecoration: 'none', fontSize: 13 }}>←</Link>
            )}
            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((n) => (
              <Link key={n} href={buildUrl({ page: String(n) })}
                style={{ padding: '6px 12px', borderRadius: 6, fontSize: 13, textDecoration: 'none',
                  backgroundColor: n === currentPage ? '#53B94A' : 'transparent',
                  color: n === currentPage ? '#fff' : '#202223',
                  border: `1px solid ${n === currentPage ? '#53B94A' : '#c9cccf'}` }}>
                {n}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link href={buildUrl({ page: String(currentPage + 1) })} style={{ padding: '6px 12px', border: '1px solid #c9cccf', borderRadius: 6, color: '#202223', textDecoration: 'none', fontSize: 13 }}>→</Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
