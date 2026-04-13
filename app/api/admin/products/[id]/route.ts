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

  // Parse array fields if sent as comma-separated strings
  const hp = Array.isArray(body.hp)
    ? body.hp
    : String(body.hp || '').split(',').map((s: string) => s.trim()).filter(Boolean)

  const voltaje = Array.isArray(body.voltaje)
    ? body.voltaje
    : String(body.voltaje || '').split(',').map((s: string) => s.trim()).filter(Boolean)

  const updated = updateProduct(productId, {
    nombre: body.nombre,
    descripcionCorta: body.descripcionCorta ?? '',
    descripcion: body.descripcion ?? '',
    precio: Number(body.precio) || 0,
    publicado: Boolean(body.publicado),
    topCategoria: body.topCategoria ?? '',
    deepCategoria: body.deepCategoria ?? '',
    marca: body.marca ?? '',
    hp,
    voltaje,
    localImage: body.localImage ?? '',
    imagenUrl: body.imagenUrl ?? '',
  })

  if (!updated) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  return NextResponse.json(updated)
}
