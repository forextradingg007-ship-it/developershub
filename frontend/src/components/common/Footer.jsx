import { Link } from 'react-router-dom'
import { profile } from '../../data/siteContent'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-black text-lg">DH</span>
              </div>
              <span className="font-black text-white text-2xl tracking-tighter font-outfit">{profile.name}</span>
            </div>
            <p className="text-lg leading-relaxed mb-8 max-w-sm">
              We engineer scalable digital products that define industries. High-performance software delivered with architectural precision.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map(s => (
                <a key={s} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-primary hover:border-primary transition-all group">
                  <span className="text-slate-400 group-hover:text-white transition-colors">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider font-outfit">Sitemap</h4>
            <ul className="space-y-4">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/services', label: 'Services' },
                { to: '/portfolio', label: 'Portfolio' },
                { to: '/blog', label: 'Blog' }
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-primary-light transition-all font-medium flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary/40 rounded-full group-hover:w-3 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider font-outfit">Connect</h4>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="text-xs uppercase text-slate-500 font-bold mb-1">Email</span>
                <a href={`mailto:${profile.email}`} className="text-white font-medium hover:text-primary-light transition-colors">{profile.email}</a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs uppercase text-slate-500 font-bold mb-1">WhatsApp</span>
                <span className="text-white font-medium">{profile.phone} ({profile.phoneLabel})</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs uppercase text-slate-500 font-bold mb-1">Office</span>
                <span className="text-white font-medium">{profile.office}</span>
              </li>
              <li className="pt-4">
                <Link to="/contact" className="inline-flex items-center gap-2 text-primary-light font-bold hover:gap-3 transition-all">
                  Book a Consultation
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium tracking-tight">
            © {new Date().getFullYear()} {profile.name}. <span className="text-slate-600">All rights reserved.</span>
          </p>
          <div className="flex items-center gap-8">
            <Link to="/admin/login" className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-400 transition-colors">Admin Access</Link>
            <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-slate-600">
              <a href="#" className="hover:text-slate-400">Privacy</a>
              <a href="#" className="hover:text-slate-400">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
