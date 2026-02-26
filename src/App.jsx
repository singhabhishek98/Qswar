import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ServicesPage from './pages/Services'
import ProjectsPage from './pages/Projects'
import AdminLogin from './admin/AdminLogin'
import Dashboard from './admin/Dashboard'
import AdminProjects from './admin/AdminProjects'
import AdminMessages from './admin/AdminMessages'
import ProtectedRoute from './auth/ProtectedRoute'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
      </Routes>
    </Router>
  )
}

