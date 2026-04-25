import { useEffect, useMemo, useState } from 'react'
import API from '../../api/axios'
import Modal from '../../components/admin/Modal'

const statusOptions = ['pending', 'confirmed', 'cancelled', 'completed']
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-gray-100 text-gray-500',
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const pageSize = 8

  const fetch = () => API.get('/bookings').then(r => setBookings(r.data.data)).catch(() => {}).finally(() => setLoading(false))
  useEffect(() => { fetch() }, [])

  const updateStatus = async (id, status) => {
    await API.put(`/bookings/${id}`, { status })
    if (selected?._id === id) setSelected(prev => ({ ...prev, status }))
    fetch()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this booking?')) return
    await API.delete(`/bookings/${id}`).then(() => { setSelected(null); fetch() })
  }

  const filteredBookings = useMemo(() => {
    return bookings.filter((bk) => {
      const matchesQuery = [bk.name, bk.email, bk.service].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'all' || bk.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [bookings, query, statusFilter])
  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize))
  const paginatedBookings = filteredBookings.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    setPage(1)
  }, [query, statusFilter])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const exportCsv = () => {
    if (!filteredBookings.length) return
    const headers = ['Name', 'Email', 'Phone', 'Service', 'Date', 'Time', 'Status', 'Message']
    const rows = filteredBookings.map((bk) => [
      bk.name || '',
      bk.email || '',
      bk.phone || '',
      bk.service || '',
      new Date(bk.date).toLocaleDateString(),
      bk.time || '',
      bk.status || '',
      bk.message || ''
    ])
    const csv = [headers, ...rows]
      .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'bookings-export.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Bookings</h1>
        <p className="text-slate-400 mt-1">Scheduled meetings and consultation requests</p>
      </div>
      <div className="admin-panel p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="input-field md:max-w-sm" placeholder="Search bookings..." />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field md:max-w-[220px]">
          <option value="all">All statuses</option>
          {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={exportCsv} className="btn-outline md:ml-2">Export CSV</button>
        <div className="md:ml-auto text-sm text-slate-400">Showing {filteredBookings.length} of {bookings.length}</div>
      </div>

      {loading ? <div className="h-40 bg-gray-100 rounded-2xl animate-pulse" /> : (
        <div className="admin-panel overflow-hidden">
          {filteredBookings.length === 0 ? <p className="text-center text-gray-400 py-16">No bookings match your filter.</p> : (
            <table className="w-full">
              <thead className="bg-slate-900/70 border-b border-white/10">
                <tr>
                  {['Name', 'Service', 'Date & Time', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-5 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paginatedBookings.map(bk => (
                  <tr key={bk._id} className="hover:bg-white/5">
                    <td className="px-5 py-4">
                      <div className="font-medium text-white">{bk.name}</div>
                      <div className="text-xs text-slate-400">{bk.email}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-300">{bk.service}</td>
                    <td className="px-5 py-4 text-sm text-slate-200">
                      <div>{new Date(bk.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                      <div className="text-xs text-slate-400">{bk.time}</div>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={bk.status}
                        onChange={e => updateStatus(bk._id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${statusColors[bk.status]}`}
                      >
                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => setSelected(bk)} className="text-xs bg-primary/20 text-primary-light px-3 py-1.5 rounded-lg hover:bg-primary/30">View</button>
                        <button onClick={() => handleDelete(bk._id)} className="text-xs bg-red-500/20 text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/30">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {filteredBookings.length > 0 && (
        <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="btn-outline disabled:opacity-50">Previous</button>
            <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="btn-outline disabled:opacity-50">Next</button>
          </div>
        </div>
      )}

      {selected && (
        <Modal title="Booking Details" onClose={() => setSelected(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-400 mb-1">Client</p><p className="font-medium">{selected.name}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Email</p><p className="font-medium">{selected.email}</p></div>
              {selected.phone && <div><p className="text-xs text-gray-400 mb-1">Phone</p><p className="font-medium">{selected.phone}</p></div>}
              <div><p className="text-xs text-gray-400 mb-1">Service</p><p className="font-medium">{selected.service}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Date</p><p className="font-medium">{new Date(selected.date).toLocaleDateString()}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Time</p><p className="font-medium">{selected.time}</p></div>
            </div>
            {selected.message && <div><p className="text-xs text-gray-400 mb-1">Message</p><p className="text-gray-700 bg-gray-50 rounded-xl p-4">{selected.message}</p></div>}
            <div>
              <p className="text-xs text-gray-400 mb-2">Update Status</p>
              <div className="flex gap-2 flex-wrap">
                {statusOptions.map(s => (
                  <button key={s} onClick={() => updateStatus(selected._id, s)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${selected.status === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
                ))}
              </div>
            </div>
            <a href={`mailto:${selected.email}?subject=Your booking confirmation`} className="btn-primary w-full justify-center">
              Email Client
            </a>
          </div>
        </Modal>
      )}
    </div>
  )
}
