import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../../components/common/PageLayout'
import API from '../../api/axios'
import { serviceShowcaseImages } from '../../data/siteContent'

const iconMap = {
  globe: 'language', smartphone: 'smartphone', palette: 'design_services', cloud: 'cloud',
  code: 'code', shield: 'security', chart: 'query_stats', settings: 'manufacturing'
}

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/services')
      .then(r => setServices(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageLayout>
      <main className="bg-slate-900 selection:bg-primary/30 selection:text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
            <span className="inline-block text-primary-light tracking-[0.2em] font-bold mb-6 uppercase text-sm border border-primary/20 px-4 py-1.5 rounded-full bg-slate-800/50 backdrop-blur-sm">
              Capabilities
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-outfit mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-purple-400">Architecture</span> Services
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Everything you need to build, launch, and scale your digital monolith. From initial concept to enterprise deployment.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-6 md:px-10 relative z-10">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-80 bg-surface-low rounded-3xl animate-pulse border border-white/5" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((s, index) => (
                  <div key={s._id} className="group relative bg-surface-low rounded-3xl p-8 md:p-10 border border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden">
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <div className="h-44 rounded-2xl overflow-hidden border border-white/10 mb-8">
                      <img
                        src={serviceShowcaseImages[index % serviceShowcaseImages.length]}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 relative z-10">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-slate-950 rounded-2xl flex items-center justify-center text-primary-light border border-white/10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 shadow-xl">
                          <span className="material-symbols-outlined !text-4xl">{iconMap[s.icon] || 'architecture'}</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-white mb-3 font-outfit">{s.title}</h3>
                        <p className="text-slate-400 mb-6 leading-relaxed">{s.description}</p>
                        
                        {s.features?.length > 0 && (
                          <ul className="space-y-3 mb-8">
                            {s.features.map(f => (
                              <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-primary-light !text-lg mt-0.5">check_circle</span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        {s.price && (
                          <div className="inline-block mt-auto border border-white/10 bg-slate-950/50 px-4 py-2 rounded-lg text-primary-light font-bold text-sm tracking-wide">
                            Starting at {s.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 md:px-10">
          <div className="max-w-4xl mx-auto text-center bg-surface-container relative p-16 rounded-3xl overflow-hidden border border-white/5">
            <div className="absolute bottom-[-50%] right-[-20%] w-[100%] h-[100%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
            
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white font-outfit mb-6 relative z-10">Need complete full-stack support?</h2>
            <p className="text-lg text-slate-400 mb-10 relative z-10">
              Frontend, backend, API integrations, database design, CI/CD, cloud deployment, and maintenance - all in one place.
            </p>
            <Link to="/booking" className="inline-block bg-white text-slate-900 px-10 py-5 rounded-xl font-black text-lg hover:bg-primary-light hover:text-slate-950 transition-all shadow-xl relative z-10">
              Book a Free Call
            </Link>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
