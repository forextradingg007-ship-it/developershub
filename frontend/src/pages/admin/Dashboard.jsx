import { useEffect, useState } from 'react'
import API from '../../api/axios'

export default function Dashboard() {
  const [stats, setStats] = useState({ services: 0, portfolio: 0, blog: 0, inquiries: 0, bookings: 0, newInquiries: 0 })
  const [recentInquiries, setRecentInquiries] = useState([])
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      API.get('/services/all'),
      API.get('/portfolio/all'),
      API.get('/blog/all'),
      API.get('/inquiries'),
      API.get('/bookings'),
    ]).then(([s, p, b, i, bk]) => {
      setStats({
        services: s.data.data.length,
        portfolio: p.data.data.length,
        blog: b.data.data.length,
        inquiries: i.data.data.length,
        bookings: bk.data.data.length,
        newInquiries: i.data.data.filter(x => x.status === 'new').length,
      })
      setRecentInquiries(i.data.data.slice(0, 5))
      setRecentBookings(bk.data.data.slice(0, 5))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const statCards = [
    { label: 'Services', value: stats.services, icon: '⚙️', color: 'bg-blue-50 text-blue-600' },
    { label: 'Portfolio Items', value: stats.portfolio, icon: '🗂️', color: 'bg-purple-50 text-purple-600' },
    { label: 'Blog Posts', value: stats.blog, icon: '✍️', color: 'bg-green-50 text-green-600' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: '📬', color: 'bg-orange-50 text-orange-600' },
    { label: 'Total Inquiries', value: stats.inquiries, icon: '💬', color: 'bg-pink-50 text-pink-600' },
    { label: 'Bookings', value: stats.bookings, icon: '📅', color: 'bg-teal-50 text-teal-600' },
  ]

  const statusColor = {
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-gray-100 text-gray-600',
    replied: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-400',
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-gray-100 text-gray-500',
  }

  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back. Here is your live business snapshot.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {statCards.map(c => (
            <div key={c.label} className="admin-panel p-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.color} mb-3 text-xl`}>
                {c.icon}
              </div>
              <div className="text-3xl font-bold text-white">{c.value}</div>
              <div className="text-sm text-slate-400 mt-1">{c.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="admin-panel p-6">
          <h2 className="font-bold text-white mb-4">Recent Inquiries</h2>
          {recentInquiries.length === 0 ? (
            <p className="text-gray-400 text-sm">No inquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map(inq => (
                <div key={inq._id} className="flex items-start justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
                  <div className="overflow-hidden">
                    <div className="font-medium text-slate-100 text-sm truncate">{inq.name}</div>
                    <div className="text-xs text-slate-400 truncate">{inq.subject}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${statusColor[inq.status]}`}>
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="admin-panel p-6">
          <h2 className="font-bold text-white mb-4">Recent Bookings</h2>
          {recentBookings.length === 0 ? (
            <p className="text-gray-400 text-sm">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map(bk => (
                <div key={bk._id} className="flex items-start justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
                  <div className="overflow-hidden">
                    <div className="font-medium text-slate-100 text-sm truncate">{bk.name}</div>
                    <div className="text-xs text-slate-400">{new Date(bk.date).toLocaleDateString()} · {bk.time}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${statusColor[bk.status]}`}>
                    {bk.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
