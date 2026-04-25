import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../../components/common/PageLayout'
import API from '../../api/axios'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/blog')
      .then(r => setPosts(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageLayout>
      <main className="bg-slate-900 min-h-screen text-white">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-4 font-outfit">Tech Blog & Insights</h1>
          <p className="text-xl text-slate-300">Detailed guides on full-stack development, architecture, APIs, deployment, and real project lessons.</p>
        </div>
      </section>

      <section className="pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="space-y-6">
            {[1,2,3].map(i => <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400 text-lg py-20">No posts published yet.</p>
        ) : (
          <div className="grid gap-8">
            {posts.map(post => (
              <Link to={`/blog/${post.slug}`} key={post._id} className="bg-surface-low border border-white/5 rounded-2xl p-8 flex gap-6 hover:border-primary/40 transition-all group">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags?.map(t => (
                      <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{t}</span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-black text-white mb-2 group-hover:text-primary-light transition-colors">{post.title}</h2>
                  <p className="text-slate-400 mb-3">{post.excerpt}</p>
                  <div className="text-sm text-slate-500">
                    {post.author} · {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      </main>
    </PageLayout>
  )
}
