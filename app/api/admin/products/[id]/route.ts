export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { updateProduct } from '@/lib/products-server'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return session && session.value === process.env.ADMIN_SESSION_SECRET
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const productId = parseInt(id)
  if (isNaN(productId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const body = await req.json()
  const products = await getProducts()
  const existingProduct = products.find(p => p.id === productId)

  if (!existingProduct) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  // Parse array fields if sent as comma-separated strings
  const hp = body.hp !== undefined 
    ? (Array.isArray(body.hp) ? body.hp : String(body.hp || '').split(',').map((s: string) => s.trim()).filter(Boolean))
    : existingProduct.hp

  const voltaje = body.voltaje !== undefined
    ? (Array.isArray(body.voltaje) ? body.voltaje : String(body.voltaje || '').split(',').map((s: string) => s.trim()).filter(Boolean))
    : existingProduct.voltaje

  const updated = updateProduct(productId, {
    nombre: body.nombre ?? existingProduct.nombre,
    descripcionCorta: body.descripcionCorta ?? existingProduct.descripcionCorta,
    descripcion: body.descripcion ?? existingProduct.descripcion,
    precio: body.precio !== undefined ? Number(body.precio) : existingProduct.precio,
    publicado: body.publicado !== undefined ? Boolean(body.publicado) : existingProduct.publicado,
    destacado: body.destacado !== undefined ? Boolean(body.destacado) : existingProduct.destacado,
    topCategoria: body.topCategoria ?? existingProduct.topCategoria,
    deepCategoria: body.deepCategoria ?? existingProduct.deepCategoria,
    marca: body.marca ?? existingProduct.marca,
    hp,
    voltaje,
    localImage: body.localImage ?? existingProduct.localImage,
    imagenUrl: body.imagenUrl ?? existingProduct.imagenUrl,
  })

  if (!updated) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  return NextResponse.json(updated)
}
