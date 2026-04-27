export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { writeFile, unlink, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { existsSync } from 'fs'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return session && session.value === process.env.ADMIN_SESSION_SECRET
}

export async function POST(req: NextRequest) {
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const action = formData.get('action') as string | null
  const filename = formData.get('filename') as string | null

  if (action === 'delete' && filename) {
    const uploadsDir = join(process.env.DATA_DIR ?? join(process.cwd(), 'public'), 'uploads')
    const filePath = join(uploadsDir, filename)
    if (existsSync(filePath)) {
      await unlink(filePath)
      return NextResponse.json({ success: true, deleted: filename })
    }
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  if (!file || file.size === 0) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const uploadsDir = join(process.env.DATA_DIR ?? join(process.cwd(), 'public'), 'uploads')
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }

  const ext = extname(file.name) || '.jpg'
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  const filePath = join(uploadsDir, uniqueName)
  await writeFile(filePath, buffer)

  return NextResponse.json({ success: true, filename: uniqueName, path: `/uploads/${uniqueName}` })
}