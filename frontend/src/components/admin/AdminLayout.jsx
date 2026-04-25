import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { profile } from '../../data/siteContent'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/services', label: 'Services', icon: '⚙️' },
  { to: '/admin/portfolio', label: 'Portfolio', icon: '🗂️' },
  { to: '/admin/blog', label: 'Blog', icon: '✍️' },
  { to: '/admin/inquiries', label: 'Inquiries', icon: '📬' },
  { to: '/admin/bookings', label: 'Bookings', icon: '📅' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell flex">
      {/* Sidebar */}
      <aside className="w-72 bg-surface-low border-r border-white/10 flex flex-col shadow-sm fixed h-full z-10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">DH</span>
            </div>
            <div>
              <div className="font-bold text-white text-sm">{profile.name}</div>
              <div className="text-xs text-slate-400">Premium Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `admin-sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</div>
              <div className="text-xs text-slate-400 truncate">{user?.username || user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-left admin-sidebar-link text-red-400 hover:bg-red-500/10 hover:text-red-300">
            <span>🚪</span><span>Logout</span>
          </button>
          <a href="/" target="_blank" className="w-full text-left admin-sidebar-link mt-1">
            <span>🌐</span><span>View Site</span>
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-72">
        <main className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
