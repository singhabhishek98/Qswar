export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <a href="#home" className="hover:opacity-80 transition">
              <img src="/logo.png" alt="QSWAR Logo" className="h-8 sm:h-10" />
            </a>
          </div>
          <p className="text-white/70">Empowering businesses through digital innovation</p>
        </div>
        <div className="text-center sm:text-left">
          <h4 className="text-purple-400 font-bold mb-4">Quick Links</h4>
          <a href="#home" className="block text-white/70 hover:text-white mb-2 transition">Home</a>
          <a href="#about" className="block text-white/70 hover:text-white mb-2 transition">About</a>
          <a href="#services" className="block text-white/70 hover:text-white mb-2 transition">Services</a>
          <a href="#contact" className="block text-white/70 hover:text-white transition">Contact</a>
        </div>
        <div className="text-center sm:text-left">
          <h4 className="text-purple-400 font-bold mb-4">Follow Us</h4>
          <div className="flex gap-4 justify-center sm:justify-start">

            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center hover:scale-125 hover:bg-blue-700 transition-all duration-300">
              <i className="fab fa-linkedin-in text-lg"></i>
            </a>

            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center hover:scale-125 hover:bg-[linear-gradient(135deg,#6A11CB,#C31432,#FF0000,#FF8C00)] transition-all duration-300">
              <i className="fab fa-instagram text-lg"></i>
            </a>

            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center hover:scale-125 hover:bg-blue-600 transition-all duration-300">
              <i className="fab fa-facebook-f text-lg"></i>
            </a>

            <a href="https://x.com" target="_blank" rel="noopener noreferrer" title="X" className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center hover:scale-125 hover:bg-black transition-all duration-300">
              <i className="fab fa-x-twitter text-lg"></i>
            </a>

            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center hover:scale-125 hover:bg-red-600 transition-all duration-300">
              <i className="fab fa-youtube text-lg"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-white/10 text-white/60">
        <p>© 2026 QSWAR Pvt Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
