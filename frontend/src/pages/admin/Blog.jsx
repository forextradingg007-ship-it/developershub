import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import API from '../../api/axios'
import Modal from '../../components/admin/Modal'

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [modal, setModal] = useState(null)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const fetch = () => API.get('/blog/all').then(r => setPosts(r.data.data)).catch(() => {}).finally(() => setLoading(false))
  useEffect(() => { fetch() }, [])

  const openAdd = () => { setEditing(null); reset({}); setModal('form') }
  const openEdit = (p) => {
    setEditing(p)
    reset({ ...p, tags: p.tags?.join(', ') })
    setModal('form')
  }

  const onSubmit = async (data) => {
    const payload = { ...data, tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [] }
    try {
      if (editing) { await API.put(`/blog/${editing._id}`, payload); toast.success('Post updated') }
      else { await API.post('/blog', payload); toast.success('Post created') }
      setModal(null); fetch()
    } catch { toast.error('Something went wrong') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    await API.delete(`/blog/${id}`).then(() => { toast.success('Deleted'); fetch() }).catch(() => toast.error('Error'))
  }

  const togglePublish = async (p) => {
    await API.put(`/blog/${p._id}`, { isPublished: !p.isPublished })
    fetch()
  }

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesQuery = [p.title, p.excerpt, p.author].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'all' || (status === 'published' ? p.isPublished : !p.isPublished)
      return matchesQuery && matchesStatus
    })
  }, [posts, query, status])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Blog</h1>
          <p className="text-slate-400 mt-1">Create detailed technical posts and manage publishing</p>
        </div>
        <button onClick={openAdd} className="btn-primary">+ New Post</button>
      </div>
      <div className="admin-panel p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="input-field md:max-w-sm" placeholder="Search blog posts..." />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-field md:max-w-[220px]">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <div className="md:ml-auto text-sm text-slate-400">Showing {filteredPosts.length} of {posts.length}</div>
      </div>

      {loading ? <div className="h-40 bg-gray-100 rounded-2xl animate-pulse" /> : (
        <div className="admin-panel overflow-hidden">
          {filteredPosts.length === 0 ? <p className="text-center text-gray-400 py-16">No posts match your filter.</p> : (
            <table className="w-full">
              <thead className="bg-slate-900/70 border-b border-white/10">
                <tr>
                  {['Title', 'Author', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPosts.map(p => (
                  <tr key={p._id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-medium text-white max-w-xs">
                      <div className="truncate">{p.title}</div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">{p.excerpt}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{p.author}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => togglePublish(p)} className={`text-xs px-3 py-1 rounded-full font-medium ${p.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {p.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="text-xs bg-primary/20 text-primary-light px-3 py-1.5 rounded-lg hover:bg-primary/30">Edit</button>
                        <button onClick={() => handleDelete(p._id)} className="text-xs bg-red-500/20 text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/30">Delete</button>
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
        <Modal title={editing ? 'Edit Post' : 'New Blog Post'} onClose={() => setModal(null)}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Title *</label>
              <input {...register('title', { required: 'Required' })} className="input-field" />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
              <input {...register('excerpt', { required: 'Required' })} className="input-field" placeholder="One-paragraph summary" />
              {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
              <textarea {...register('content', { required: 'Required' })} className="input-field resize-none" rows={8} placeholder="Write your blog post content here..." />
              {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input {...register('author')} className="input-field" placeholder="DevelopersHub Team" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input {...register('tags')} className="input-field" placeholder="React, Node.js" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input {...register('imageUrl')} className="input-field" placeholder="https://..." />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register('isPublished')} id="isPublished" className="w-4 h-4 accent-primary" />
              <label htmlFor="isPublished" className="text-sm text-gray-700">Publish immediately</label>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center">
                {isSubmitting ? 'Saving...' : editing ? 'Save Changes' : 'Create Post'}
              </button>
              <button type="button" onClick={() => setModal(null)} className="btn-outline flex-1 justify-center">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
