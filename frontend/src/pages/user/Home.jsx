import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../../components/common/PageLayout'
import API from '../../api/axios'
import { profile, serviceShowcaseImages } from '../../data/siteContent'

const iconMap = {
  globe: 'code', smartphone: 'smartphone', palette: 'auto_awesome', cloud: 'cloud',
  code: 'code', shield: 'shield', chart: 'bar_chart', settings: 'settings'
}

export default function Home() {
  const [services, setServices] = useState([])
  const [portfolio, setPortfolio] = useState([])

  useEffect(() => {
    API.get('/services').then(r => setServices(r.data.data.slice(0, 4))).catch(() => {})
    API.get('/portfolio').then(r => setPortfolio(r.data.data.slice(0, 3))).catch(() => {})
  }, [])

  return (
    <PageLayout>
      <main className="bg-slate-900 selection:bg-primary/30 selection:text-white">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[100px] rounded-full"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-surface-high text-primary-light text-xs font-bold tracking-[0.1em] uppercase mb-6 border border-primary/20">
                Full-Stack Portfolio
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 text-white font-outfit">
                {profile.name.toUpperCase()} <br /> <span className="text-primary-light [text-shadow:_0_0_20px_rgba(196,192,255,0.4)]">FULL-STACK</span> <br /> DEVELOPER
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl mb-12">
                Building modern web apps, APIs, dashboards, and cloud-ready products for startups and businesses in {profile.location}.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/services" className="bg-primary text-white px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3 shadow-lg shadow-primary/20">
                  Explore Services
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link to="/booking" className="border border-slate-700 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-surface-high transition-colors backdrop-blur-sm">
                  Book a Call
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-full aspect-square max-w-lg relative group">
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-all"></div>
                <img 
                  alt="Digital Monolith" 
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_35px_35px_rgba(108,99,255,0.3)] animate-float"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBahMzUNOhsGdv9Bf3ylJcjECl7zH6WVlJKZbXe1CqYWTBxW3vc-zKZK-UPew5vY1dfVnegSkpSCF8LjtBKPNgGoIaT_KuFEx_On44Ec20PKEgkZtCHFYc8xo7v1CaXgFB19aL6kyiUC2SkUjeSrRPLmi4L4lfoy9ZzdN81v8NTW9ZYzKiv2zUG0yhiBCHWbEu5gsMNmTntCVwqfzlGQtoIBAKyOUNA1U6hNpV0tPCm0iggGH1nxS72e7uB-0iOMBo9_VCbdtNJwTG6"
                />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 right-0 text-[15rem] md:text-[20rem] font-black text-white/[0.03] pointer-events-none select-none tracking-tighter font-outfit">
            BUILD
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-20 border-y border-white/5 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
            {[
              { label: 'Projects', value: '50+' },
              { label: 'Rating', value: '5.0', icon: 'star' },
              { label: 'Experience', value: '3yr' },
              { label: 'Uptime', value: '99%' },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center justify-center md:justify-start gap-2">
                  {stat.value}
                  {stat.icon && <span className="text-primary material-symbols-outlined !text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>}
                </div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32 bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-20 text-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white font-outfit">Expertise Driven by <span className="text-primary-light">Precision</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">We don't just build features; we architect robust ecosystems designed for exponential growth.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((s, index) => (
                <div key={s._id} className="p-10 rounded-2xl bg-surface-low hover:bg-surface-high transition-all group border border-white/5 hover:border-primary/20">
                  <div className="h-32 rounded-xl overflow-hidden mb-6 border border-white/10">
                    <img src={serviceShowcaseImages[index % serviceShowcaseImages.length]} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-3xl">{iconMap[s.icon] || 'lightbulb'}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{s.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{s.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-32 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white font-outfit uppercase">Selected <br /> Works</h2>
                <p className="text-slate-400 text-xl">Crafting premium experiences for global brands.</p>
              </div>
              <Link to="/portfolio" className="group flex items-center gap-4 text-primary-light font-bold text-lg">
                View All Projects
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
            </div>
            <div className="grid lg:grid-cols-3 gap-12">
              {portfolio.map((p, i) => (
                <div key={p._id} className="group">
                  <div className="rounded-2xl overflow-hidden mb-8 aspect-[4/5] bg-surface-highest relative border border-white/5">
                    <img 
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" 
                      src={i === 0 ? "https://lh3.googleusercontent.com/aida-public/AB6AXuATt_gELPXpYeaC35lbkylM8W5FjlUF_8MWvdC-RlBCsEfV0lgSWGXebI52j77Y9-IT0LO_l1I9ovp4aaOJItrQBtoyfcj-olGDzl8VfJeykwdJB_b8wPrWmL617EXCWtTU28MNNCoJtGX-GEKOqmYEuMgilS9fxW4sNk8AExXCWumIfbDlbnkrr_aCd_6uThOMpMayaUXYoTRVQyhT5-6RXEntvY5ZCfsVKI-cz0MQVewpOiTMkTiJOrHb6AjnB1kTbTBmYPiozn7i" : (i === 1 ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBMIhUegDEvFue6RyL3yVe97wymXQCKxG6oQAtuQIyPSUaL7Ps6IpfBTDgrI2DiXPV_Q_MD7OVEfRo8R6450gtjLoIugJSZhC9sjA5oFK8uZO0dauzPtPP4sUbTM7Oa5VMYbyfnYwO1A7F1VTvDAJXI4EYoPzbQ9NlajamXGPSo6gr-YLWIC6VBw-JXE_zvJ2-xjTH77tvZfLFbjtleUA0UFHzlBZ_qhEhZizqukLcuHsEGpFt5fgI_xqpxSHkQ8kHiL_b0x8Yaj9YI" : "https://lh3.googleusercontent.com/aida-public/AB6AXuDV8BOX-x-O_bmICnJQ_fisexlPVEpJgCyKmmGU0cHoWEHUt2ygQ8fRn8sWUN3qDjFbri2BhlFEiHQmulY3MZpMw4bM7LvlKyhPo0IeV6dPmpCeUIlJiswtJdgiLPlX48btNOeDvMpFUZa74HLxEv2ApsERedMP9WJ_3o1SY-DMjcEkG-q_EHpvd7fbbLw0Rw2cvQ3hIJYlrgUCneUs87YC-8rxDYuNqJuAr4YnUWqMC-ig3kf739GM-5B-zxdXtOyLeErO5jXDldPn")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-8 left-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.techStack?.slice(0, 2).map(tech => (
                          <span key={tech} className="px-3 py-1 bg-primary/20 text-primary-light text-xs font-bold rounded-full backdrop-blur-md border border-primary/20">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-3xl font-black mb-3 text-white font-outfit uppercase">{p.title}</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed line-clamp-2">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="bg-surface-container relative rounded-3xl p-12 md:p-24 overflow-hidden text-center border border-white/5">
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] -mr-64 -mb-64"></div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 relative z-10 text-white font-outfit">READY TO BUILD <br /> SOMETHING GREAT?</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 relative z-10">Let's discuss your next breakthrough project. Our engineers are ready to transform your vision into a digital reality.</p>
              <div className="flex flex-wrap justify-center gap-6 relative z-10">
                <Link to="/booking" className="bg-primary text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-transform flex items-center gap-4 shadow-xl shadow-primary/20">
                  Book a Meeting
                  <span className="material-symbols-outlined">calendar_today</span>
                </Link>
                <Link to="/contact" className="bg-surface-highest text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-surface-bright transition-colors border border-white/10 backdrop-blur-sm">
                  Message Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
