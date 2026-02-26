
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane } from 'react-icons/fa'
import { useState } from 'react'
import { contactService } from '../../utils/contactService.js'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const maxLength = 500

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await contactService.sendMessage(formData)
      setStatus('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('Error sending message')
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-8 bg-gray-50 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 sm:mb-12">Get In Touch</h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {status && <p className="text-center text-green-600 font-medium">{status}</p>}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="p-4 pl-12 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-600/25 transition w-full" 
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="email" 
              placeholder="Your Email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="p-4 pl-12 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-600/25 transition w-full" 
              required
            />
          </div>
          <div className="relative">
            <FaCommentDots className="absolute left-4 top-6 text-gray-400" />
            <textarea 
              placeholder="Your Message" 
              rows="3" 
              maxLength={maxLength}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="p-4 pl-12 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-600/25 transition w-full"
              required
            ></textarea>
            <div className="text-right text-sm text-gray-500 mt-1">{formData.message.length}/{maxLength}</div>
          </div>
          <button type="submit" className="bg-gradient-to-r from-blue-800 to-purple-600 text-white px-8 py-3 rounded-full text-base font-semibold hover:-translate-y-1 hover:shadow-xl transition-all flex items-center justify-center gap-2 w-fit">
            <FaPaperPlane />Send Message
          </button>
        </form>
        <div className="flex flex-col gap-6 text-left">
          <div className="flex items-center gap-4 text-lg text-gray-600">
            <span>📧</span> <span>info@qswar.com</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-gray-600">
            <span>📞</span> <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-gray-600">
            <span>📍</span> <span>Delhi, India</span>
          </div>
          <div className="text-8xl sm:text-9xl text-center mt-4 sm:mt-8">🗺️</div>
        </div>
      </div>
    </section>
  )
}
