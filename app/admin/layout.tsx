import { cookies } from 'next/headers'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminSidebar from './components/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-next-pathname') || headersList.get('x-invoke-path') || ''

  // Don't apply auth check to login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!session || session.value !== secret) {
    redirect('/admin/login')
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'Nunito, system-ui, sans-serif',
        backgroundColor: '#f4f6f8',
      }}
    >
      <AdminSidebar />
      <main
        style={{
          marginLeft: '240px',
          flex: 1,
          minHeight: '100vh',
          backgroundColor: '#f4f6f8',
        }}
      >
        {children}
      </main>
    </div>
  )
}
