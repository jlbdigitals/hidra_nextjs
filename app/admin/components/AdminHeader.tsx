interface AdminHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function AdminHeader({ title, subtitle, actions }: AdminHeaderProps) {
  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e1e3e5',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 5,
      }}
    >
      <div>
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#202223',
            margin: 0,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '13px', color: '#6d7175', margin: '2px 0 0' }}>{subtitle}</p>
        )}
      </div>
      {actions && <div style={{ display: 'flex', gap: '8px' }}>{actions}</div>}
    </header>
  )
}
