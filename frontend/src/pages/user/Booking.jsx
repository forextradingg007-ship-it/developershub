import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import PageLayout from '../../components/common/PageLayout'
import API from '../../api/axios'

const timeSlots = ['9:00 AM','10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM']

export default function Booking() {
  const [services, setServices] = useState([])
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  useEffect(() => {
    API.get('/services').then(r => setServices(r.data.data)).catch(() => {})
  }, [])

  const onSubmit = async (data) => {
    try {
      await API.post('/bookings', data)
      toast.success('Meeting booked! We\'ll confirm shortly.')
      reset()
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <PageLayout>
      <main className="bg-slate-900 selection:bg-primary/30 selection:text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-purple-500/20 blur-[100px] rounded-full"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
            <span className="inline-block text-primary-light tracking-[0.2em] font-bold mb-6 uppercase text-sm border border-primary/20 px-4 py-1.5 rounded-full bg-slate-800/50 backdrop-blur-sm">
              Consultation
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-outfit mb-6 uppercase">
              Book a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-purple-400">Meeting</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Schedule a free architectural consultation with our senior engineers. Let's map out your next digital monolith.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 md:px-10 relative z-10 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              
              {/* Benefits (Left Side) */}
              <div className="space-y-8">
                <h2 className="text-2xl font-black text-white font-outfit mb-6">Why book a call?</h2>
                <div className="space-y-6">
                  {[
                    { icon: 'schedule', title: '30 min', desc: 'Free discovery call' },
                    { icon: 'psychology', title: 'Expert advice', desc: 'From senior architects' },
                    { icon: 'calendar_month', title: 'Flexible', desc: 'Pick your preferred time' },
                    { icon: 'lock', title: 'No commitment', desc: 'Zero pressure discussion' }
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-5 p-6 bg-surface-low rounded-2xl border border-white/5 hover:border-primary/20 transition-colors group">
                      <div className="text-primary-light bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined !text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <div className="font-bold text-lg text-white mb-1">{item.title}</div>
                        <div className="text-sm text-slate-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form (Right Side) */}
              <div className="md:col-span-2 bg-surface-low rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
                
                <h3 className="text-2xl font-black text-white font-outfit mb-8 relative z-10">Select your preferred slot</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name *</label>
                      <input {...register('name', { required: 'Required' })} className="input-field" placeholder="Jane Smith" />
                      {errors.name && <p className="text-red-400 text-xs mt-2 font-medium">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email *</label>
                      <input {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} className="input-field" placeholder="jane@company.com" />
                      {errors.email && <p className="text-red-400 text-xs mt-2 font-medium">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Phone</label>
                    <input {...register('phone')} className="input-field" placeholder="+1 (555) 000-0000" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Service Interested In *</label>
                    <select {...register('service', { required: 'Required' })} className="input-field appearance-none">
                      <option value="" className="bg-slate-900">Select a service...</option>
                      {services.map(s => <option key={s._id} value={s.title} className="bg-slate-900">{s.title}</option>)}
                      <option value="General Consultation" className="bg-slate-900">General Consultation</option>
                    </select>
                    {errors.service && <p className="text-red-400 text-xs mt-2 font-medium">{errors.service.message}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Preferred Date *</label>
                      <input {...register('date', { required: 'Required' })} type="date" min={today} className="input-field" />
                      {errors.date && <p className="text-red-400 text-xs mt-2 font-medium">{errors.date.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Preferred Time *</label>
                      <select {...register('time', { required: 'Required' })} className="input-field appearance-none">
                        <option value="" className="bg-slate-900">Select time...</option>
                        {timeSlots.map(t => <option key={t} value={t} className="bg-slate-900">{t} PST</option>)}
                      </select>
                      {errors.time && <p className="text-red-400 text-xs mt-2 font-medium">{errors.time.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tell us about your project</label>
                    <textarea {...register('message')} className="input-field resize-none" rows={4} placeholder="Brief description of what you need..." />
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white px-8 py-5 rounded-xl font-black text-lg hover:bg-primary-light transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4">
                    {isSubmitting ? (
                      <span className="material-symbols-outlined animate-spin">autorenew</span>
                    ) : (
                      <>
                        Confirm Booking
                        <span className="material-symbols-outlined">event_available</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
              
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
