import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import API from '../../api/axios'
import Modal from '../../components/admin/Modal'

const statusOptions = ['new', 'read', 'replied', 'closed']
const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-gray-100 text-gray-600',
  replied: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-400',
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const pageSize = 8

  const fetch = () => API.get('/inquiries').then(r => setInquiries(r.data.data)).catch(() => {}).finally(() => setLoading(false))
  useEffect(() => { fetch() }, [])

  const updateStatus = async (id, status) => {
    await API.put(`/inquiries/${id}`, { status, isRead: true })
    if (selected?._id === id) setSelected(prev => ({ ...prev, status }))
    fetch()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return
    await API.delete(`/inquiries/${id}`).then(() => { toast.success('Deleted'); setSelected(null); fetch() })
  }

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesQuery = [inq.name, inq.email, inq.subject].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'all' || inq.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [inquiries, query, statusFilter])
  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / pageSize))
  const paginatedInquiries = filteredInquiries.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    setPage(1)
  }, [query, statusFilter])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const exportCsv = () => {
    if (!filteredInquiries.length) return
    const headers = ['Name', 'Email', 'Phone', 'Subject', 'Status', 'Date', 'Message']
    const rows = filteredInquiries.map((inq) => [
      inq.name || '',
      inq.email || '',
      inq.phone || '',
      inq.subject || '',
      inq.status || '',
      new Date(inq.createdAt).toLocaleString(),
      inq.message || ''
    ])
    const csv = [headers, ...rows]
      .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'inquiries-export.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Inquiries</h1>
        <p className="text-slate-400 mt-1">Client messages from your contact form</p>
      </div>
      <div className="admin-panel p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="input-field md:max-w-sm" placeholder="Search inquiries..." />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field md:max-w-[220px]">
          <option value="all">All statuses</option>
          {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={exportCsv} className="btn-outline md:ml-2">Export CSV</button>
        <div className="md:ml-auto text-sm text-slate-400">Showing {filteredInquiries.length} of {inquiries.length}</div>
      </div>

      {loading ? <div className="h-40 bg-gray-100 rounded-2xl animate-pulse" /> : (
        <div className="admin-panel overflow-hidden">
          {filteredInquiries.length === 0 ? <p className="text-center text-gray-400 py-16">No inquiries match your filter.</p> : (
            <table className="w-full">
              <thead className="bg-slate-900/70 border-b border-white/10">
                <tr>
                  {['Name', 'Email', 'Subject', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-5 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paginatedInquiries.map(inq => (
                  <tr key={inq._id} className={`hover:bg-white/5 cursor-pointer ${!inq.isRead ? 'bg-primary/10' : ''}`}>
                    <td className="px-5 py-4 font-medium text-white">{inq.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-400">{inq.email}</td>
                    <td className="px-5 py-4 text-sm text-slate-300 max-w-[160px] truncate">{inq.subject}</td>
                    <td className="px-5 py-4">
                      <select
                        value={inq.status}
                        onChange={e => updateStatus(inq._id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${statusColors[inq.status]}`}
                        onClick={e => e.stopPropagation()}
                      >
                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400">{new Date(inq.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => setSelected(inq)} className="text-xs bg-primary/20 text-primary-light px-3 py-1.5 rounded-lg hover:bg-primary/30">View</button>
                        <button onClick={() => handleDelete(inq._id)} className="text-xs bg-red-500/20 text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/30">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {filteredInquiries.length > 0 && (
        <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="btn-outline disabled:opacity-50">Previous</button>
            <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="btn-outline disabled:opacity-50">Next</button>
          </div>
        </div>
      )}

      {selected && (
        <Modal title="Inquiry Details" onClose={() => setSelected(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-400 mb-1">From</p><p className="font-medium">{selected.name}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Email</p><p className="font-medium">{selected.email}</p></div>
              {selected.phone && <div><p className="text-xs text-gray-400 mb-1">Phone</p><p className="font-medium">{selected.phone}</p></div>}
              <div><p className="text-xs text-gray-400 mb-1">Date</p><p className="font-medium">{new Date(selected.createdAt).toLocaleString()}</p></div>
            </div>
            <div><p className="text-xs text-gray-400 mb-1">Subject</p><p className="font-semibold text-gray-900">{selected.subject}</p></div>
            <div><p className="text-xs text-gray-400 mb-1">Message</p><p className="text-gray-700 bg-gray-50 rounded-xl p-4 leading-relaxed">{selected.message}</p></div>
            <div>
              <p className="text-xs text-gray-400 mb-2">Update Status</p>
              <div className="flex gap-2">
                {statusOptions.map(s => (
                  <button key={s} onClick={() => updateStatus(selected._id, s)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${selected.status === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
                ))}
              </div>
            </div>
            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary w-full justify-center">
              Reply via Email
            </a>
          </div>
        </Modal>
      )}
    </div>
  )
}
