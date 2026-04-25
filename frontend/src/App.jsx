import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

// User pages
import Home from './pages/user/Home'
import About from './pages/user/About'
import Services from './pages/user/Services'
import Portfolio from './pages/user/Portfolio'
import Blog from './pages/user/Blog'
import BlogPost from './pages/user/BlogPost'
import Contact from './pages/user/Contact'
import Booking from './pages/user/Booking'

// Admin pages
import AdminLogin from './pages/admin/Login'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminServices from './pages/admin/Services'
import AdminPortfolio from './pages/admin/Portfolio'
import AdminBlog from './pages/admin/Blog'
import AdminInquiries from './pages/admin/Inquiries'
import AdminBookings from './pages/admin/Bookings'

const PrivateRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
