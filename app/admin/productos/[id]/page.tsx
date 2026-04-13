import { getProductById, getProducts, getProductSlug } from '@/lib/products-server'
import AdminHeader from '../../components/AdminHeader'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductEditor from './ProductEditor'

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

  return (
    <div style={{ padding: '0 32px 40px' }}>
      <AdminHeader
        title={product.nombre}
        subtitle={`ID #${product.id} · ${product.deepCategoria}`}
        actions={
          <Link
            href="/admin/productos"
            style={{ padding: '8px 16px', border: '1px solid #c9cccf', borderRadius: 6, fontSize: 14, color: '#202223', textDecoration: 'none', fontWeight: 500 }}
          >
            ← Volver
          </Link>
        }
      />
      <div style={{ marginTop: 20 }}>
        <ProductEditor product={product} productSlug={getProductSlug(product)} />
      </div>
    </div>
  )
}
