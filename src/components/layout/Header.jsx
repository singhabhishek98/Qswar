import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleContactClick = () => {
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#contact'
    }
  }

  return (
    <nav className={`fixed top-0 w-full bg-white z-50 transition-all ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <Link to="/" className="hover:opacity-80 transition">
            <img src="/logo.png" alt="QSWAR Logo" className="h-10 sm:h-20" />
          </Link>
        </div>
        <div className="flex gap-4 sm:gap-8 items-center">
          <a href="#home" className="hidden md:inline text-gray-600 hover:text-purple-600 font-medium transition">Home</a>
          <a href="#about" className="hidden md:inline text-gray-600 hover:text-purple-600 font-medium transition">About</a>
          <a href="#services" className="hidden md:inline text-gray-600 hover:text-purple-600 font-medium transition">Services</a>
          <a href="#projects" className="hidden md:inline text-gray-600 hover:text-purple-600 font-medium transition">Projects</a>
          <button onClick={handleContactClick} className="hidden md:inline text-gray-600 hover:text-purple-600 font-medium transition bg-transparent border-none cursor-pointer">Contact</button>
          <button className="bg-gradient-to-r from-blue-800 to-purple-600 text-white px-4 sm:px-7 py-2 sm:py-3 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition-all">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

