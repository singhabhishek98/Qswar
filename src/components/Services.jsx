const services = [
  { icon: '💻', title: 'Web Development', desc: 'Modern, responsive websites built with latest technologies' },
  { icon: '📱', title: 'Mobile Apps', desc: 'Native and cross-platform mobile solutions' },
  { icon: '☁️', title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and deployment' },
  { icon: '🔒', title: 'Cybersecurity', desc: 'Enterprise-grade security implementations' },
  { icon: '🤖', title: 'AI Integration', desc: 'Smart automation and AI-powered features' },
  { icon: '📊', title: 'Data Analytics', desc: 'Business intelligence and data visualization' }
]

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-8 bg-white text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 sm:mb-12">Our Services</h2>
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service, i) => (
          <div key={i} className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border-2 border-transparent hover:border-purple-600 hover:-translate-y-3 hover:shadow-2xl transition-all">
            <div className="text-4xl sm:text-5xl mb-4">{service.icon}</div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
