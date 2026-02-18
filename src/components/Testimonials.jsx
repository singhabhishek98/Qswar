import { useState, useEffect } from 'react'

const testimonials = [
  { name: 'Lakshmi S Patel', role: 'CEO, TechCorp', text: 'QSWAR delivered beyond expectations. Professional team with excellent technical expertise.' },
  { name: 'Priya Sharma', role: 'CTO, StartupHub', text: 'Fast delivery, secure architecture, and 24/7 support. Highly recommended!' },
  { name: 'Nagina Patel', role: 'Director, FinTech Solutions', text: 'Their innovative approach transformed our digital presence completely.' }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 sm:mb-12">What Our Clients Say</h2>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 p-8 sm:p-12 rounded-2xl shadow-xl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-linear-to-r from-blue-800 to-purple-600 rounded-full flex items-center justify-center text-3xl sm:text-4xl text-white">
            👤
          </div>
          <p className="text-lg sm:text-xl text-gray-600 italic mb-6 leading-relaxed">
            "{testimonials[current].text}"
          </p>
          <h4 className="text-slate-900 text-lg sm:text-xl font-bold mb-2">{testimonials[current].name}</h4>
          <span className="text-purple-600 text-sm">{testimonials[current].role}</span>
        </div>
      </div>
    </section>
  )
}
