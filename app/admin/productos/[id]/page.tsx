import { getProductById, getProducts, getProductSlug } from '@/lib/products'
import AdminHeader from '../../components/AdminHeader'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return []
}

export const dynamic = 'force-dynamic'

export default async function AdminProductoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(parseInt(id))
  if (!product) notFound()

  const S = {
    card: { backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e1e3e5', padding: 24, marginBottom: 20 },
    label: { fontSize: 12, fontWeight: 600, color: '#6d7175', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 4, display: 'block' },
    value: { fontSize: 14, color: '#202223', lineHeight: 1.5 },
    chip: (color: string, bg: string) => ({ display: 'inline-block', padding: '3px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600, color, backgroundColor: bg, marginRight: 4, marginBottom: 4 }),
  }

  return (
    <div style={{ padding: '0 32px 40px' }}>
      <AdminHeader
        title={product.nombre}
        subtitle={product.deepCategoria}
        actions={<Link href="/admin/productos" style={{ padding: '8px 16px', border: '1px solid #c9cccf', borderRadius: 6, fontSize: 14, color: '#202223', textDecoration: 'none', fontWeight: 500 }}>← Volver</Link>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Main info */}
        <div>
          <div style={S.card}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#202223', marginBottom: 20, marginTop: 0 }}>Información del producto</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <span style={S.label}>ID</span>
                <span style={S.value}>#{product.id}</span>
              </div>
              <div>
                <span style={S.label}>Estado</span>
                <span style={{ ...S.chip(product.publicado ? '#2d6a4f' : '#856404', product.publicado ? '#e3f5e1' : '#fef3cd') }}>
                  {product.publicado ? 'Publicado' : 'Borrador'}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <span style={S.label}>Nombre</span>
              <span style={{ ...S.value, fontWeight: 600 }}>{product.nombre}</span>
            </div>

            {product.descripcionCorta && (
              <div style={{ marginBottom: 16 }}>
                <span style={S.label}>Descripción corta</span>
                <p style={{ ...S.value, margin: 0, whiteSpace: 'pre-wrap' }}>{product.descripcionCorta}</p>
              </div>
            )}

            {product.descripcion && (
              <div style={{ marginBottom: 16 }}>
                <span style={S.label}>Descripción completa</span>
                <p style={{ ...S.value, margin: 0, whiteSpace: 'pre-wrap' }}>{product.descripcion}</p>
              </div>
            )}
          </div>

          {/* Categories */}
          <div style={S.card}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#202223', marginBottom: 16, marginTop: 0 }}>Categorías</h2>
            <div>
              {product.categorias.map((c) => (
                <span key={c} style={S.chip('#54595F', '#F3F8F3')}>{c}</span>
              ))}
            </div>
          </div>

          {/* Specs */}
          {(product.hp.length > 0 || product.voltaje.length > 0) && (
            <div style={S.card}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#202223', marginBottom: 16, marginTop: 0 }}>Especificaciones</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {product.hp.length > 0 && (
                  <div>
                    <span style={S.label}>Potencia (HP)</span>
                    <div>{product.hp.map((h) => <span key={h} style={S.chip('#53B94A', '#F3F8F3')}>{h} HP</span>)}</div>
                  </div>
                )}
                {product.voltaje.length > 0 && (
                  <div>
                    <span style={S.label}>Voltaje</span>
                    <div>{product.voltaje.map((v) => <span key={v} style={S.chip('#6d7175', '#f4f6f8')}>{v}V</span>)}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: image + links */}
        <div>
          {/* Image */}
          <div style={{ ...S.card, textAlign: 'center' }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6d7175', marginBottom: 12, marginTop: 0 }}>IMAGEN</h3>
            <div style={{ width: '100%', aspectRatio: '1', backgroundColor: '#F3F8F3', border: '1px solid #e0e0e0', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 12 }}>
              {(product.localImage || product.imagenUrl) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.localImage || product.imagenUrl.replace('http://hidra.local', '')} alt={product.nombre} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }} />
              ) : (
                <span style={{ fontSize: 48, opacity: 0.2 }}>💧</span>
              )}
            </div>
            {product.imagenUrl && (
              <a href={product.imagenUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#53B94A', textDecoration: 'none' }}>Ver imagen original</a>
            )}
          </div>

          {/* Actions */}
          <div style={S.card}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6d7175', marginBottom: 12, marginTop: 0 }}>ACCIONES</h3>
            <a href={`/productos/${getProductSlug(product)}`} target="_blank" rel="noreferrer"
              style={{ display: 'block', width: '100%', padding: '10px 16px', backgroundColor: '#53B94A', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', textAlign: 'center', marginBottom: 8, boxSizing: 'border-box' }}>
              Ver en el sitio ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
