export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { updateProduct, getProducts } from '@/lib/products-server'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return session && session.value === process.env.ADMIN_SESSION_SECRET
}

export async function PUT(req: NextRequest) {
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { productIds, localImage, accion, fasico } = body

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return NextResponse.json({ error: 'productIds required' }, { status: 400 })
  }

  const results: { id: number; success: boolean; error?: string }[] = []

  for (const id of productIds) {
    const productId = parseInt(id)
    if (isNaN(productId)) {
      results.push({ id, success: false, error: 'Invalid id' })
      continue
    }

    if (accion === 'removeImage') {
      const updated = await updateProduct(productId, { localImage: '', imagenUrl: '' })
      results.push({ id: productId, success: !!updated })
    } else if (fasico !== undefined) {
      const updated = await updateProduct(productId, { fasico })
      results.push({ id: productId, success: !!updated })
    } else if (localImage !== undefined) {
      const updated = await updateProduct(productId, { localImage })
      results.push({ id: productId, success: !!updated })
    } else {
      results.push({ id: productId, success: false, error: 'No image data' })
    }
  }

  return NextResponse.json({ results })
}