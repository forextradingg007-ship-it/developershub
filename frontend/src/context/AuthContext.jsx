import { createContext, useContext, useState, useEffect } from 'react'
import API from '../api/axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('dh_user')
    return u ? JSON.parse(u) : null
  })
  const [loading, setLoading] = useState(false)

  const login = async (identifier, password) => {
    setLoading(true)
    const { data } = await API.post('/auth/login', { identifier, password })
    localStorage.setItem('dh_token', data.token)
    localStorage.setItem('dh_user', JSON.stringify(data.user))
    setUser(data.user)
    setLoading(false)
    return data
  }

  const logout = () => {
    localStorage.removeItem('dh_token')
    localStorage.removeItem('dh_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
