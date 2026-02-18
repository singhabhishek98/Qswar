export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
        <div className="text-center text-8xl sm:text-9xl drop-shadow-lg">🏢</div>
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">About QSWAR</h2>
          <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8">
            Leading IT solutions provider delivering cutting-edge software development, cloud services, and digital transformation solutions to businesses worldwide.
          </p>
          <div className="bg-white p-4 sm:p-6 rounded-xl mb-6 border-l-4 border-purple-600">
            <h3 className="text-purple-600 font-bold mb-2">Mission</h3>
            <p className="text-gray-600">Empowering businesses with innovative technology solutions</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-linear-to-r from-blue-800 to-purple-600 text-white p-4 sm:p-6 rounded-xl text-center">
              <strong className="block text-2xl sm:text-3xl mb-2">5+</strong>
              <span className="text-sm">Years Experience</span>
            </div>
            <div className="bg-linear-to-r from-blue-800 to-purple-600 text-white p-4 sm:p-6 rounded-xl text-center">
              <strong className="block text-2xl sm:text-3xl mb-2">100+</strong>
              <span className="text-sm">Projects Delivered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
