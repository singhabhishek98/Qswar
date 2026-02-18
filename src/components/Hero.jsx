import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-purple-600 pt-24 sm:pt-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="absolute w-96 h-96 sm:w-125 sm:h-125 bg-purple-600/30 rounded-full blur-3xl -top-20 -right-20"></div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-16 items-center relative z-10">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-6">
            Empowering Businesses Through Digital Innovation
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8">
            Smart software solutions built for scalability and performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={scrollToContact} className="bg-linear-to-r from-blue-800 to-purple-600 text-white px-7 py-3 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition-all">
              Get Started
            </button>
            <button onClick={() => navigate('/services')} className="border-2 border-white text-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all">
              View Services
            </button>
          </div>
        </div>
        <div className="relative h-64 sm:h-96 flex items-center justify-center">
          <div className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-purple-400/30 rounded-full top-10 left-10 animate-float"></div>
          <div className="absolute w-28 h-28 sm:w-36 sm:h-36 bg-purple-400/30 rounded-full bottom-20 right-10 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-purple-400/30 rounded-full top-1/2 left-20 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="text-6xl sm:text-9xl animate-float drop-shadow-2xl">💻</div>
        </div>
      </div>
    </section>
  )
}
