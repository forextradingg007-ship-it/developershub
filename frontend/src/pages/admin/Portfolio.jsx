import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import API from '../../api/axios'
import Modal from '../../components/admin/Modal'

export default function AdminPortfolio() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [modal, setModal] = useState(null)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const fetch = () => API.get('/portfolio/all').then(r => setItems(r.data.data)).catch(() => {}).finally(() => setLoading(false))
  useEffect(() => { fetch() }, [])

  const openAdd = () => { setEditing(null); reset({}); setModal('form') }
  const openEdit = (item) => {
    setEditing(item)
    reset({ ...item, techStack: item.techStack?.join(', ') })
    setModal('form')
  }

  const onSubmit = async (data) => {
    const payload = { ...data, techStack: data.techStack ? data.techStack.split(',').map(t => t.trim()).filter(Boolean) : [] }
    try {
      if (editing) { await API.put(`/portfolio/${editing._id}`, payload); toast.success('Project updated') }
      else { await API.post('/portfolio', payload); toast.success('Project added') }
      setModal(null); fetch()
    } catch { toast.error('Something went wrong') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await API.delete(`/portfolio/${id}`).then(() => { toast.success('Deleted'); fetch() }).catch(() => toast.error('Error'))
  }

  const categories = useMemo(() => ['all', ...new Set(items.map((i) => i.category).filter(Boolean))], [items])
  const filteredItems = useMemo(() => {
    return items.filter((p) => {
      const matchesQuery = [p.title, p.description, p.techStack?.join(' ')].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'all' || p.category === category
      return matchesQuery && matchesCategory
    })
  }, [items, query, category])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Portfolio</h1>
          <p className="text-slate-400 mt-1">Manage your project showcase with dynamic media and links</p>
        </div>
        <button onClick={openAdd} className="btn-primary">+ Add Project</button>
      </div>
      <div className="admin-panel p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="input-field md:max-w-sm" placeholder="Search projects..." />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field md:max-w-[220px]">
          {categories.map((c) => <option key={c} value={c}>{c === 'all' ? 'All categories' : c}</option>)}
        </select>
        <div className="md:ml-auto text-sm text-slate-400">Showing {filteredItems.length} of {items.length}</div>
      </div>

      {loading ? <div className="h-40 bg-gray-100 rounded-2xl animate-pulse" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.length === 0 ? <p className="text-gray-400 col-span-3 text-center py-16">No projects match your filter.</p> : filteredItems.map(p => (
            <div key={p._id} className="admin-panel overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-primary/20 to-purple-100 flex items-center justify-center text-4xl">💻</div>
              <div className="p-4">
                <div className="text-xs text-primary font-medium mb-1">{p.category}</div>
                <h3 className="font-bold text-white mb-1 truncate">{p.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-2 mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.techStack?.slice(0,3).map(t => <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{t}</span>)}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="text-xs bg-primary/20 text-primary-light px-3 py-1.5 rounded-lg hover:bg-primary/30 flex-1">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-xs bg-red-500/20 text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/30 flex-1">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal === 'form' && (
        <Modal title={editing ? 'Edit Project' : 'Add Project'} onClose={() => setModal(null)}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Title *</label>
              <input {...register('title', { required: 'Required' })} className="input-field" />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Description *</label>
              <textarea {...register('description', { required: 'Required' })} className="input-field resize-none" rows={3} />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input {...register('category')} className="input-field" placeholder="Web Development" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack (comma-separated)</label>
              <input {...register('techStack')} className="input-field" placeholder="React, Node.js, MongoDB" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                <input {...register('liveUrl')} className="input-field" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                <input {...register('githubUrl')} className="input-field" placeholder="https://github.com/..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input {...register('imageUrl')} className="input-field" placeholder="https://..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center">
                {isSubmitting ? 'Saving...' : editing ? 'Save Changes' : 'Add Project'}
              </button>
              <button type="button" onClick={() => setModal(null)} className="btn-outline flex-1 justify-center">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
