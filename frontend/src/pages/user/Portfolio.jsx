import { useEffect, useState } from 'react'
import PageLayout from '../../components/common/PageLayout'
import API from '../../api/axios'

export default function Portfolio() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    API.get('/portfolio')
      .then(r => setItems(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(items.map(i => i.category))]
  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter)

  return (
    <PageLayout>
      <main className="bg-slate-900 selection:bg-primary/30 selection:text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-outfit mb-6 uppercase">
              Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-cyan-300">GitHub Projects</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Real projects, real results. See what we've built for global brands and ambitious startups.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 md:px-10 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-16">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border ${
                    filter === c 
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-surface-low border-white/5 text-slate-400 hover:text-white hover:border-white/20 hover:bg-surface-high'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3].map(i => <div key={i} className="h-96 bg-surface-low rounded-3xl animate-pulse border border-white/5" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filtered.map((p, i) => (
                  <div key={p._id} className="group relative bg-surface-low rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 flex flex-col">
                    <div className="h-56 bg-slate-950 relative overflow-hidden flex-shrink-0">
                      {/* Using abstract placeholders based on index to keep it looking premium */}
                      <img 
                        alt={p.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 mix-blend-luminosity group-hover:mix-blend-normal" 
                        src={
                          p.imageUrl || (i % 3 === 0 ? "https://lh3.googleusercontent.com/aida-public/AB6AXuATt_gELPXpYeaC35lbkylM8W5FjlUF_8MWvdC-RlBCsEfV0lgSWGXebI52j77Y9-IT0LO_l1I9ovp4aaOJItrQBtoyfcj-olGDzl8VfJeykwdJB_b8wPrWmL617EXCWtTU28MNNCoJtGX-GEKOqmYEuMgilS9fxW4sNk8AExXCWumIfbDlbnkrr_aCd_6uThOMpMayaUXYoTRVQyhT5-6RXEntvY5ZCfsVKI-cz0MQVewpOiTMkTiJOrHb6AjnB1kTbTBmYPiozn7i" : 
                          i % 3 === 1 ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBMIhUegDEvFue6RyL3yVe97wymXQCKxG6oQAtuQIyPSUaL7Ps6IpfBTDgrI2DiXPV_Q_MD7OVEfRo8R6450gtjLoIugJSZhC9sjA5oFK8uZO0dauzPtPP4sUbTM7Oa5VMYbyfnYwO1A7F1VTvDAJXI4EYoPzbQ9NlajamXGPSo6gr-YLWIC6VBw-JXE_zvJ2-xjTH77tvZfLFbjtleUA0UFHzlBZ_qhEhZizqukLcuHsEGpFt5fgI_xqpxSHkQ8kHiL_b0x8Yaj9YI" : 
                          "https://lh3.googleusercontent.com/aida-public/AB6AXuDV8BOX-x-O_bmICnJQ_fisexlPVEpJgCyKmmGU0cHoWEHUt2ygQ8fRn8sWUN3qDjFbri2BhlFEiHQmulY3MZpMw4bM7LvlKyhPo0IeV6dPmpCeUIlJiswtJdgiLPlX48btNOeDvMpFUZa74HLxEv2ApsERedMP9WJ_3o1SY-DMjcEkG-q_EHpvd7fbbLw0Rw2cvQ3hIJYlrgUCneUs87YC-8rxDYuNqJuAr4YnUWqMC-ig3kf739GM-5B-zxdXtOyLeErO5jXDldPn")
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-90"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/50 text-white text-xs font-bold rounded-full backdrop-blur-md border border-white/10 uppercase tracking-wider">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                      
                      <h3 className="font-black text-white text-2xl mb-3 font-outfit uppercase">{p.title}</h3>
                      <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{p.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {p.techStack?.map(t => (
                          <span key={t} className="text-xs bg-white/5 text-primary-light border border-primary/20 px-3 py-1 rounded-full font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4 pt-4 border-t border-white/5">
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-white font-bold hover:text-primary-light transition-colors group/link">
                            Live Demo <span className="material-symbols-outlined !text-lg group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                          </a>
                        )}
                        {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-slate-400 font-bold hover:text-white transition-colors">
                            <span className="material-symbols-outlined !text-lg">code</span> Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
