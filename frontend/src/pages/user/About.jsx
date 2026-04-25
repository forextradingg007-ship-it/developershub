import PageLayout from '../../components/common/PageLayout'
import { Link } from 'react-router-dom'
import { profile } from '../../data/siteContent'

const values = [
  { icon: 'lightbulb', title: 'Innovation', desc: 'Pushing boundaries with bleeding-edge technologies and creative architectural solutions.' },
  { icon: 'verified', title: 'Quality', desc: 'Uncompromising standards in performance, accessibility, and clean code maintenance.' },
  { icon: 'visibility', title: 'Transparency', desc: 'Real-time collaboration and radical honesty throughout the development lifecycle.' },
  { icon: 'bolt', title: 'Speed', desc: 'Rapid prototyping and deployment without sacrificing architectural integrity.' },
]

export default function About() {
  return (
    <PageLayout>
      <main className="bg-slate-900 selection:bg-primary/30 selection:text-white">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity" 
              alt="abstract tech" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuzGa_BmiVDBU2UImM02npPO3ktjuct8fTI2Ba6J0CvKoaX_O2ZPVODHQvcnoi4VOYKpqv4j2NwDlznpBbI72y_r2T_ZMY1YCOzMUGLq68zNStaKHgGL7mkUOx9WRgDLiExI2NVZOmsixsuhbr0IfCXspn7ujShq6ZrvnRe6GmrcY1ZPe-zncWSqSwCSPzirHC0KDF2oST-NhsBtGMAlLtCJyr5rnldSuo0-0ue5VbyFhy3-1z3CbC440OpwzyvUHw1EfeoIoIi4Xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-900"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
            <div className="max-w-4xl">
              <span className="inline-block text-primary-light tracking-[0.2em] font-bold mb-6 uppercase text-sm border border-primary/20 px-4 py-1.5 rounded-full bg-slate-800/50 backdrop-blur-sm">
                Architecting the future
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-outfit leading-[1] mb-8">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-cyan-300">{profile.name}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-12 font-medium">
                Full-stack engineer from {profile.location}, focused on shipping modern web products with clean architecture and measurable business impact.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Stats Section */}
        <section className="py-32 px-6 md:px-10 bg-slate-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white font-outfit">Building Reliable Full-Stack Solutions</h2>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">
                I build products across frontend, backend, APIs, databases, cloud deployment, and automation. The goal is simple: deliver software that is fast, maintainable, and ready for real business growth.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: 'rocket_launch', num: '20+', label: 'Projects Delivered' },
                { icon: 'code', num: '15+', label: 'Production APIs' },
                { icon: 'deployed_code', num: '10+', label: 'Cloud Deployments' },
                { icon: 'public', num: '24/7', label: 'Support Availability' },
              ].map((stat, i) => (
                <div key={i} className={`bg-surface-low backdrop-blur-xl p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors shadow-lg shadow-primary/5 ${i === 1 || i === 3 ? 'mt-0 md:mt-12' : 'mt-0 md:-mt-12'}`}>
                  <div className="text-primary-light mb-4">
                    <span className="material-symbols-outlined text-4xl">{stat.icon}</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-black font-outfit text-white mb-2">{stat.num}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-32 px-6 md:px-10 bg-slate-950/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white font-outfit mb-4">The DNA of Our Monoliths</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">Foundational principles that guide every line of code and every pixel we place.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="p-10 rounded-2xl bg-surface-low transition-all hover:-translate-y-2 border border-white/5 hover:border-primary/20">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary-light mb-8">
                    <span className="material-symbols-outlined text-3xl">{v.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-outfit text-white">{v.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profile Section */}
        <section className="py-32 px-6 md:px-10 bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white font-outfit mb-4">Professional Profile</h2>
                <p className="text-slate-400 text-lg">Personal brand and contact information updated as requested.</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-low">
                <img className="w-full aspect-[4/5] object-cover" alt={profile.name} src={profile.image} />
              </div>
              <div className="bg-surface-low border border-white/5 rounded-3xl p-10">
                <h3 className="text-4xl font-black text-white font-outfit mb-4">{profile.name}</h3>
                <p className="text-slate-300 mb-8">Full-Stack Developer (MERN, Next.js, Node.js, APIs, Cloud)</p>
                <div className="space-y-4 text-slate-300">
                  <p><span className="text-primary-light font-bold">Email:</span> {profile.email}</p>
                  <p><span className="text-primary-light font-bold">WhatsApp:</span> {profile.phone}</p>
                  <p><span className="text-primary-light font-bold">Office:</span> {profile.office}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 md:px-10">
          <div className="max-w-5xl mx-auto text-center bg-surface-container relative p-16 md:p-24 rounded-3xl overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full -ml-48 -mb-48"></div>
            
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white font-outfit mb-8 relative z-10">Ready to build your monolith?</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Let's discuss how we can transform your digital vision into an architectural masterpiece that scales with your ambition.
            </p>
            <Link to="/contact" className="inline-block bg-primary text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-primary/20 relative z-10">
              Schedule a Consultation
            </Link>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
