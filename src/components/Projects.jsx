import { useNavigate } from 'react-router-dom';

const projects = [
  { title: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', path: '/projects/ecommerce-platform', image: '/Images/E_com.jpg' },
  { title: 'Banking Dashboard', tech: 'Next.js, PostgreSQL', path: '/projects/banking-dashboard', image: '/Images/bank.jpg' },
  { title: 'Healthcare App', tech: 'React Native, Firebase', path: '/projects/healthcare-app', image: '/Images/health.jpg' }
]

export default function Projects() {
  const navigate = useNavigate();

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-900 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12">Our Projects</h2>
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-purple-500 hover:shadow-2xl transition-all">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">{project.title}</h3>
            <p className="text-purple-400 mb-6">{project.tech}</p>
            <button onClick={() => navigate(project.path)} className="bg-gradient-to-r from-blue-800 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all">View Project</button>
          </div>
        ))}
      </div>
    </section>
  )
}
