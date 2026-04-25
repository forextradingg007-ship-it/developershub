import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import PageLayout from '../../components/common/PageLayout'
import API from '../../api/axios'
import { profile } from '../../data/siteContent'

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      await API.post('/inquiries', data)
      toast.success('Message sent! We\'ll be in touch soon.')
      reset()
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <PageLayout>
      <main className="bg-slate-900 selection:bg-primary/30 selection:text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[0%] right-[20%] w-[30%] h-[30%] bg-primary/20 blur-[100px] rounded-full"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-outfit mb-6 uppercase">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-purple-400">Touch</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Have a visionary project in mind? We'd love to architect it with you.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 md:px-10 relative z-10 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Contact Information (Left Side) */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-black text-white font-outfit mb-4">Let's start a conversation</h2>
                  <p className="text-slate-400 leading-relaxed">
                    Whether you're looking to build a new platform from scratch or scale an existing system, our team of expert architects is ready to help.
                  </p>
                </div>
                
                <div className="space-y-8">
                  {[
                    { icon: 'mail', label: 'Email', val: profile.email },
                    { icon: 'call', label: 'WhatsApp', val: `${profile.phone} (${profile.phoneLabel})` },
                    { icon: 'location_on', label: 'Location', val: profile.location },
                    { icon: 'business_center', label: 'Office', val: profile.office },
                  ].map((item, index) => (
                    <div key={item.label} className="flex items-start gap-6 group">
                      <div className="w-14 h-14 bg-surface-low border border-white/5 rounded-2xl flex items-center justify-center text-primary-light group-hover:bg-primary group-hover:text-white group-hover:border-primary/50 transition-all duration-300 shadow-lg">
                        <span className="material-symbols-outlined !text-2xl">{item.icon}</span>
                      </div>
                      <div className="pt-1">
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{item.label}</div>
                        <div className="font-bold text-lg text-white group-hover:text-primary-light transition-colors">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-surface-low/50 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-lg shadow-primary/5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <h3 className="font-bold text-white font-outfit">Quick Response Time</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We currently have availability for new projects. We typically respond to all inquiries within 2 business hours.
                  </p>
                </div>
              </div>

              {/* Form (Right Side) */}
              <div className="bg-surface-low rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>
                
                <h3 className="text-2xl font-black text-white font-outfit mb-8 relative z-10">Send us a message</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Name *</label>
                      <input {...register('name', { required: 'Name is required' })} className="input-field" placeholder="John Doe" />
                      {errors.name && <p className="text-red-400 text-xs mt-2 font-medium">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email *</label>
                      <input {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} className="input-field" placeholder="john@company.com" />
                      {errors.email && <p className="text-red-400 text-xs mt-2 font-medium">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Phone</label>
                    <input {...register('phone')} className="input-field" placeholder="03086555580" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Subject *</label>
                    <input {...register('subject', { required: 'Subject required' })} className="input-field" placeholder="Project Inquiry" />
                    {errors.subject && <p className="text-red-400 text-xs mt-2 font-medium">{errors.subject.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Message *</label>
                    <textarea {...register('message', { required: 'Message required' })} className="input-field resize-none" rows={5} placeholder="Tell us about your project..." />
                    {errors.message && <p className="text-red-400 text-xs mt-2 font-medium">{errors.message.message}</p>}
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white px-8 py-5 rounded-xl font-black text-lg hover:bg-primary-light transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <span className="material-symbols-outlined animate-spin">autorenew</span>
                    ) : (
                      <>
                        Send Message
                        <span className="material-symbols-outlined">send</span>
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
