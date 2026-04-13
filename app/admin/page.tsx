import { getQuotes } from '@/lib/quotes'
import { getProducts, getTopCategories } from '@/lib/products-server'
import AdminHeader from './components/AdminHeader'
import Link from 'next/link'

function StatCard({
  title,
  value,
  description,
  color = '#53B94A',
}: {
  title: string
  value: string | number
  description?: string
  color?: string
}) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '24px',
        border: '1px solid #e1e3e5',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ fontSize: '13px', color: '#6d7175', fontWeight: 600, marginBottom: '8px' }}>
        {title}
      </div>
      <div
        style={{
          fontSize: '32px',
          fontWeight: 800,
          color: color,
          lineHeight: 1,
          marginBottom: '4px',
        }}
      >
        {value}
      </div>
      {description && (
        <div style={{ fontSize: '12px', color: '#8a8f94', marginTop: '6px' }}>
          {description}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ estado }: { estado: string }) {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    pendiente: { bg: '#fff3cd', color: '#856404', label: 'Pendiente' },
    revisado: { bg: '#cce5ff', color: '#004085', label: 'Revisado' },
    cerrado: { bg: '#d4edda', color: '#155724', label: 'Cerrado' },
  }
  const s = styles[estado] || styles.pendiente
  return (
    <span
      style={{
        backgroundColor: s.bg,
        color: s.color,
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600,
      }}
    >
      {s.label}
    </span>
  )
}

export default function AdminDashboard() {
  const quotes = getQuotes()
  const products = getProducts()
  const categories = getTopCategories()

  const pendingCount = quotes.filter((q) => q.estado === 'pendiente').length
  const recentQuotes = quotes.slice(0, 5)

  const brands = new Set<string>()
  for (const p of products) {
    if (p.marca) brands.add(p.marca)
  }

  return (
    <div>
      <AdminHeader title="Dashboard" />

      <div style={{ padding: '32px' }}>
        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <StatCard title="TOTAL PRODUCTOS" value={products.length} description="En catálogo" color="#202223" />
          <StatCard title="PEDIDOS PENDIENTES" value={pendingCount} description="Sin revisar" color="#53B94A" />
          <StatCard title="CATEGORÍAS" value={categories.length} description="Top categorías" color="#202223" />
          <StatCard title="MARCAS" value={brands.size} description="Marcas activas" color="#202223" />
        </div>

        {/* Recent Quotes */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e1e3e5',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid #e1e3e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#202223', margin: 0 }}>
              Cotizaciones recientes
            </h2>
            <Link
              href="/admin/pedidos"
              style={{
                fontSize: '13px',
                color: '#53B94A',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Ver todas →
            </Link>
          </div>

          {recentQuotes.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: '#6d7175', fontSize: '14px' }}>
              No hay cotizaciones aún
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  {['ID', 'Fecha', 'Cliente', 'Email', 'Productos', 'Estado'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '10px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#6d7175',
                        borderBottom: '1px solid #e1e3e5',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentQuotes.map((q) => (
                  <tr
                    key={q.id}
                    style={{ borderBottom: '1px solid #f1f2f3' }}
                  >
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6d7175' }}>
                      <Link
                        href={`/admin/pedidos/${q.id}`}
                        style={{ color: '#53B94A', fontWeight: 600, textDecoration: 'none' }}
                      >
                        #{q.id.slice(-6)}
                      </Link>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6d7175' }}>
                      {new Date(q.fecha).toLocaleDateString('es-CL')}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#202223', fontWeight: 600 }}>
                      {q.nombre}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6d7175' }}>
                      {q.email}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6d7175', textAlign: 'center' }}>
                      {q.productos.length}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <StatusBadge estado={q.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Link
            href="/admin/productos"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e1e3e5',
              borderRadius: '8px',
              padding: '20px 24px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#f3f8f3',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#53B94A',
                fontSize: '18px',
              }}
            >
              📦
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#202223' }}>
                Gestionar Productos
              </div>
              <div style={{ fontSize: '12px', color: '#6d7175' }}>
                Ver y editar el catálogo
              </div>
            </div>
          </Link>

          <Link
            href="/admin/pedidos"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e1e3e5',
              borderRadius: '8px',
              padding: '20px 24px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#f3f8f3',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#53B94A',
                fontSize: '18px',
              }}
            >
              📋
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#202223' }}>
                Ver Cotizaciones
              </div>
              <div style={{ fontSize: '12px', color: '#6d7175' }}>
                {pendingCount} pendiente{pendingCount !== 1 ? 's' : ''}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
