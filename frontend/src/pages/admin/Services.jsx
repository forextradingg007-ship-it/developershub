import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import API from '../../api/axios'
import Modal from '../../components/admin/Modal'

const iconOptions = ['globe', 'smartphone', 'palette', 'cloud', 'code', 'shield', 'chart', 'settings']

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [modal, setModal] = useState(null) // null | 'add' | 'edit'
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const fetchServices = () => {
    API.get('/services/all').then(r => setServices(r.data.data)).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { fetchServices() }, [])

  const openAdd = () => { setEditing(null); reset({}); setModal('form') }
  const openEdit = (s) => {
    setEditing(s)
    reset({ ...s, features: s.features?.join(', ') })
    setModal('form')
  }

  const onSubmit = async (data) => {
    const payload = { ...data, features: data.features ? data.features.split(',').map(f => f.trim()).filter(Boolean) : [] }
    try {
      if (editing) {
        await API.put(`/services/${editing._id}`, payload)
        toast.success('Service updated')
      } else {
        await API.post('/services', payload)
        toast.success('Service created')
      }
      setModal(null)
      fetchServices()
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return
    try {
      await API.delete(`/services/${id}`)
      toast.success('Service deleted')
      fetchServices()
    } catch { toast.error('Error deleting service') }
  }

  const toggleActive = async (s) => {
    await API.put(`/services/${s._id}`, { isActive: !s.isActive })
    fetchServices()
  }

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesQuery = [s.title, s.shortDescription].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'all' || (status === 'active' ? s.isActive : !s.isActive)
      return matchesQuery && matchesStatus
    })
  }, [services, query, status])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Services</h1>
          <p className="text-slate-400 mt-1">Manage your premium full-stack service offerings</p>
        </div>
        <button onClick={openAdd} className="btn-primary">+ Add Service</button>
      </div>
      <div className="admin-panel p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="input-field md:max-w-sm" placeholder="Search services..." />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-field md:max-w-[180px]">
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div className="md:ml-auto text-sm text-slate-400">Showing {filteredServices.length} of {services.length}</div>
      </div>

      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-2xl animate-pulse" />)}</div>
      ) : (
        <div className="admin-panel overflow-hidden">
          {filteredServices.length === 0 ? (
            <p className="text-center text-gray-400 py-16">No services yet. Add your first one!</p>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-900/70 border-b border-white/10">
                <tr>
                  {['Title', 'Short Description', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredServices.map(s => (
                  <tr key={s._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{s.title}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm max-w-xs truncate">{s.shortDescription}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleActive(s)} className={`text-xs px-3 py-1 rounded-full font-medium ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {s.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(s)} className="text-xs bg-primary/20 text-primary-light px-3 py-1.5 rounded-lg hover:bg-primary/30">Edit</button>
                        <button onClick={() => handleDelete(s._id)} className="text-xs bg-red-500/20 text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/30">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {modal === 'form' && (
        <Modal title={editing ? 'Edit Service' : 'Add Service'} onClose={() => setModal(null)}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Title *</label>
              <input {...register('title', { required: 'Required' })} className="input-field" placeholder="Web Development" />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Short Description *</label>
              <input {...register('shortDescription', { required: 'Required' })} className="input-field" placeholder="One-line summary" />
              {errors.shortDescription && <p className="text-red-400 text-xs mt-1">{errors.shortDescription.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Full Description *</label>
              <textarea {...register('description', { required: 'Required' })} className="input-field resize-none" rows={3} />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Icon</label>
                <select {...register('icon')} className="input-field">
                  {iconOptions.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Price (optional)</label>
                <input {...register('price')} className="input-field" placeholder="$999" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Features (comma-separated)</label>
              <input {...register('features')} className="input-field" placeholder="React, Node.js, MongoDB" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center">
                {isSubmitting ? 'Saving...' : editing ? 'Save Changes' : 'Create Service'}
              </button>
              <button type="button" onClick={() => setModal(null)} className="btn-outline flex-1 justify-center">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
