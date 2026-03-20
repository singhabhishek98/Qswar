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
import LeaveLogin from './leave/LeaveLogin'
import LeaveSignup from './leave/LeaveSignup'
import UserLeave from './leave/UserLeave'
import ManagerLeave from './leave/ManagerLeave'
import AdminLeave from './leave/AdminLeave'
import CreateLeave from './leave/CreateLeave'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
        <Route path="/admin/submission" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        <Route path="/leave/login" element={<LeaveLogin />} />
        <Route path="/leave/signup" element={<LeaveSignup />} />
        <Route path="/leave/user" element={<UserLeave />} />
        <Route path="/leave/manager" element={<ManagerLeave />} />
        <Route path="/leave/admin" element={<AdminLeave />} />
        <Route path="/leave/create" element={<CreateLeave />} />
        <Route path="/leave/edit/:id" element={<CreateLeave />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
      </Routes>
    </Router>
  )
}

