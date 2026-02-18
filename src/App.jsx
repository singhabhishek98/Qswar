import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import WhyChoose from './components/WhyChoose'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import ViewServices from './Pages/ViewServices'
import ProjectsPage from './Pages/ProjectsPage'
import HealthcareApp from './Pages/Projects/HealthcareApp'
import ECommercePlatform from './Pages/Projects/E-CommercePlatform'
import BankingDashboard from './Pages/Projects/BankingDashboard'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Services />
              <WhyChoose />
              <Projects />
              <Testimonials />
              <Contact />
            </>
          } />
          <Route path="/services" element={<ViewServices />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/healthcare-app" element={<HealthcareApp />} />
          <Route path="/projects/ecommerce-platform" element={<ECommercePlatform />} />
          <Route path="/projects/banking-dashboard" element={<BankingDashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

