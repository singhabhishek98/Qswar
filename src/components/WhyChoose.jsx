const features = [
  { icon: '👨💻', title: 'Expert Developers' },
  { icon: '⚡', title: 'Fast Delivery' },
  { icon: '🔒', title: 'Secure Architecture' },
  { icon: '🎧', title: '24/7 Support' }
]

export default function WhyChoose() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-linear-to-r from-slate-900 to-blue-900 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12">Why Choose QSWAR</h2>
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {features.map((feature, i) => (
          <div key={i} className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-purple-400/20 rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-lg shadow-purple-400/40">
              {feature.icon}
            </div>
            <h3 className="text-white text-lg sm:text-xl font-semibold">{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
