export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  getCategories,
  getCategoryProductCounts,
  addCategory,
  updateCategory,
  deleteCategory,
} from '@/lib/categories'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return session && session.value === process.env.ADMIN_SESSION_SECRET
}

export async function GET() {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const cats = await getCategories()
  const counts = await getCategoryProductCounts()
  return NextResponse.json(cats.map((c) => ({ ...c, count: counts[c.id] ?? 0 })))
}

export async function POST(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name, slug, parentId, description, icon } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 })
  const cat = await addCategory({ name: name.trim(), slug: slug?.trim() || '', parentId: parentId ?? null, description: description ?? '', icon: icon ?? '' })
  return NextResponse.json(cat, { status: 201 })
}

export async function PUT(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, ...data } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const updated = await updateCategory(Number(id), data)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const ok = deleteCategory(id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
