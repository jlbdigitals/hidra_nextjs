import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow login page through
  if (pathname === '/admin/login') {
    const response = NextResponse.next()
    response.headers.set('x-next-pathname', pathname)
    return response
  }

  // Protect all /admin/* routes
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session')
    const secret = process.env.ADMIN_SESSION_SECRET

    if (!secret || !session || session.value !== secret) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  const response = NextResponse.next()
  response.headers.set('x-next-pathname', pathname)
  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
