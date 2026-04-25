import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../../data/siteContent'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-900/80 backdrop-blur-lg py-4 border-b border-white/5 shadow-2xl shadow-slate-950/40' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
              <span className="text-white font-black text-lg">DH</span>
            </div>
            <span className="font-black text-white text-2xl tracking-tighter font-outfit">{profile.name}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 ${
                  pathname === l.to 
                    ? 'text-primary-light bg-white/10' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/booking" className="bg-primary text-white ml-4 py-3 px-6 rounded-xl text-sm font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20">
              Start a Project
            </Link>
            <Link to="/admin/login" className="border border-primary/40 text-primary-light ml-2 py-3 px-5 rounded-xl text-sm font-bold hover:bg-primary/10 transition-all">
              Admin Sign In
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-3 rounded-xl bg-white/5 border border-white/10">
            <div className={`w-6 h-0.5 bg-white transition-all mb-1.5 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all mb-1.5 ${open ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-white/5 px-6 py-8 space-y-3 transition-all duration-300 origin-top ${
        open ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
      }`}>
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            className={`block px-6 py-4 rounded-xl text-lg font-bold ${
              pathname === l.to ? 'text-primary-light bg-white/10' : 'text-slate-400'
            }`}
          >
            {l.label}
          </Link>
        ))}
        <Link to="/booking" onClick={() => setOpen(false)} className="block bg-primary text-white text-center py-4 rounded-xl text-lg font-bold mt-4 shadow-lg shadow-primary/20">
          Book a Meeting
        </Link>
        <Link to="/admin/login" onClick={() => setOpen(false)} className="block border border-primary/40 text-primary-light text-center py-4 rounded-xl text-lg font-bold">
          Admin Sign In
        </Link>
      </div>
    </nav>
  )
}
