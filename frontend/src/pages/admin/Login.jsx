import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import { profile } from '../../data/siteContent'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [capsOn, setCapsOn] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await login(data.identifier, data.password)
      navigate('/admin')
    } catch {
      toast.error('Invalid username/email or password')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">DH</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Sign In</h1>
          <p className="text-gray-400 mt-1">{profile.name} Control Panel</p>
        </div>
        <div className="bg-surface-low border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="mb-6 rounded-xl border border-white/10 bg-slate-900/50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-light font-bold mb-1">Secure Access</p>
            <p className="text-sm text-slate-300">Only authorized admin accounts can access dashboard data and controls.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Username or Email</label>
              <input
                {...register('identifier', { required: 'Username or email required' })}
                className="input-field"
                placeholder="Enter username or email"
                type="text"
                autoComplete="username"
              />
              {errors.identifier && <p className="text-red-400 text-xs mt-1">{errors.identifier.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password required' })}
                  className="input-field pr-12"
                  placeholder="Enter password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  onKeyUp={(e) => setCapsOn(e.getModifierState('CapsLock'))}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined !text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              {capsOn && <p className="text-amber-300 text-xs mt-1">Caps Lock is ON</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
              {isSubmitting ? 'Signing in...' : 'Sign In Securely'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
