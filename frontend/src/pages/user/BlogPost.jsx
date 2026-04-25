import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageLayout from '../../components/common/PageLayout'
import API from '../../api/axios'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get(`/blog/slug/${slug}`)
      .then(r => setPost(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <PageLayout><div className="flex justify-center py-40"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div></PageLayout>
  if (!post) return <PageLayout><div className="text-center py-40 text-gray-400">Post not found. <Link to="/blog" className="text-primary">← Back to Blog</Link></div></PageLayout>

  return (
    <PageLayout>
      <article className="max-w-3xl mx-auto px-4 py-20">
        <Link to="/blog" className="text-primary text-sm font-medium hover:underline mb-8 inline-block">← Back to Blog</Link>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map(t => (
            <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{t}</span>
          ))}
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
        <div className="text-sm text-gray-400 mb-10">
          {post.author} · {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </PageLayout>
  )
}
