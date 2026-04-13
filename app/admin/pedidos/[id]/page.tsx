import { getQuoteById } from '@/lib/quotes'
import AdminHeader from '../../components/AdminHeader'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import QuoteStatusUpdater from './QuoteStatusUpdater'

export const dynamic = 'force-dynamic'

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pendiente: { bg: '#fef3cd', color: '#856404', label: 'Pendiente' },
  revisado:  { bg: '#cce5ff', color: '#004085', label: 'Revisado' },
  cerrado:   { bg: '#e3f5e1', color: '#2d6a4f', label: 'Cerrado' },
}

export default async function AdminPedidoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const quote = getQuoteById(id)
  if (!quote) notFound()

  const st = STATUS_STYLES[quote.estado] || STATUS_STYLES.pendiente

  const S = {
    card: { backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e1e3e5', padding: 24, marginBottom: 20 },
    label: { fontSize: 12, fontWeight: 600 as const, color: '#6d7175', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 4, display: 'block' as const },
    value: { fontSize: 14, color: '#202223' },
    th: { padding: '10px 16px', textAlign: 'left' as const, fontSize: 12, fontWeight: 600 as const, color: '#6d7175', backgroundColor: '#f9fafb', borderBottom: '1px solid #e1e3e5' },
    td: { padding: '12px 16px', borderBottom: '1px solid #f4f6f8', fontSize: 14, color: '#202223' },
  }

  return (
    <div style={{ padding: '0 32px 40px' }}>
      <AdminHeader
        title={`Cotización ${quote.id}`}
        actions={<Link href="/admin/pedidos" style={{ padding: '8px 16px', border: '1px solid #c9cccf', borderRadius: 6, fontSize: 14, color: '#202223', textDecoration: 'none' }}>← Volver</Link>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <div>
          {/* Client info */}
          <div style={S.card}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#202223', marginBottom: 20, marginTop: 0 }}>Datos del cliente</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div><span style={S.label}>Nombre</span><span style={{ ...S.value, fontWeight: 600 }}>{quote.nombre}</span></div>
              {quote.empresa && <div><span style={S.label}>Empresa</span><span style={S.value}>{quote.empresa}</span></div>}
              <div><span style={S.label}>Email</span>
                <a href={`mailto:${quote.email}`} style={{ ...S.value, color: '#53B94A', textDecoration: 'none' }}>{quote.email}</a>
              </div>
              <div><span style={S.label}>Teléfono</span>
                <a href={`tel:${quote.telefono}`} style={{ ...S.value, color: '#53B94A', textDecoration: 'none' }}>{quote.telefono}</a>
              </div>
            </div>
            {quote.mensaje && (
              <div style={{ marginTop: 16 }}>
                <span style={S.label}>Mensaje</span>
                <p style={{ ...S.value, margin: 0, backgroundColor: '#f9fafb', padding: 12, borderRadius: 6, border: '1px solid #e1e3e5', whiteSpace: 'pre-wrap' }}>{quote.mensaje}</p>
              </div>
            )}
          </div>

          {/* Products */}
          <div style={{ ...S.card, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e1e3e5' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#202223', margin: 0 }}>
                Productos solicitados ({quote.productos.length})
              </h2>
            </div>
            {quote.productos.length === 0 ? (
              <p style={{ padding: 24, color: '#6d7175', fontSize: 14 }}>Sin productos específicos (cotización general).</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={S.th}>Producto</th>
                    <th style={{ ...S.th, textAlign: 'center', width: 80 }}>Cantidad</th>
                    <th style={S.th}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.productos.map((p) => (
                    <tr key={p.id}>
                      <td style={S.td}><span style={{ fontWeight: 600 }}>{p.nombre}</span></td>
                      <td style={{ ...S.td, textAlign: 'center' }}>
                        <span style={{ fontWeight: 700, color: '#53B94A' }}>{p.cantidad}</span>
                      </td>
                      <td style={S.td}>
                        <Link href={`/admin/productos/${p.id}`} style={{ color: '#53B94A', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>Ver producto →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Status */}
          <div style={S.card}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6d7175', marginBottom: 12, marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado</h3>
            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700, backgroundColor: st.bg, color: st.color, marginBottom: 16 }}>
              {st.label}
            </span>
            <QuoteStatusUpdater quoteId={quote.id} currentStatus={quote.estado} />
          </div>

          {/* Quick actions */}
          <div style={S.card}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6d7175', marginBottom: 12, marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contactar</h3>
            <a href={`mailto:${quote.email}?subject=Cotización ${quote.id} - Hidra&body=Estimado/a ${quote.nombre},%0A%0A`}
              style={{ display: 'block', padding: '10px 16px', backgroundColor: '#53B94A', color: '#fff', borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center', marginBottom: 8 }}>
              Responder por email
            </a>
            <a href={`tel:${quote.telefono}`}
              style={{ display: 'block', padding: '10px 16px', border: '1px solid #c9cccf', color: '#202223', borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none', textAlign: 'center' }}>
              Llamar: {quote.telefono}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
