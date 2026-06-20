import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  BarChart3,
  Settings,
  LogOut,
  Truck,
  RotateCcw,
  Database,
  DollarSign,
  TrendingUp
} from 'lucide-react'

function AdminLayout({ children }) {
  const { user, logout, hasPermission } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', permission: 'analytics' },
    { path: '/admin/products', icon: Package, label: 'Productos', permission: 'products' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Pedidos', permission: 'orders' },
    { path: '/admin/procurement', icon: Database, label: 'Compras y presupuestos', permission: 'procurement' },
    { path: '/admin/discounts', icon: Tags, label: 'Descuentos', permission: 'discounts' },
    { path: '/admin/shipping', icon: Truck, label: 'Envíos y tracking', permission: 'shipping' },
    { path: '/admin/returns', icon: RotateCcw, label: 'Devoluciones', permission: 'returns' },
    { path: '/admin/billing', icon: DollarSign, label: 'Facturación', permission: 'billing' },
    { path: '/admin/crm', icon: TrendingUp, label: 'CRM y prospectos', permission: 'crm' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analítica y reportes', permission: 'analytics' },
    { path: '/admin/users', icon: Users, label: 'Usuarios', permission: 'users' },
  ]

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="admin-brand-mark">V</span>
          <div><strong>VIARO</strong><small>COMMERCE OS</small></div>
        </div>

        <div className="admin-user">
          <div className="admin-user-info">
            <strong>{user.name}</strong>
            <span className="admin-role">{user.role}</span>
          </div>
        </div>

        <nav className="admin-nav">
          {menuItems.map(item => {
            if (!hasPermission(item.permission)) return null
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div><span className="admin-header-kicker">OPERACIÓN VIARO</span><h1>{menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}</h1></div>
          <span className="admin-live-indicator">● Operación activa</span>
        </header>
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
