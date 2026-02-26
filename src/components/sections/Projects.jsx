import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../utils/api.js';

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    { title: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', description: 'Full-featured online shopping platform', image: '/Images/E_com.jpg' },
    { title: 'Banking Dashboard', tech: 'Next.js, PostgreSQL', description: 'Secure banking management system', image: '/Images/bank.jpg' },
    { title: 'Healthcare App', tech: 'React Native, Firebase', description: 'Mobile health tracking application', image: '/Images/health.jpg' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      if (response.data.length > 0) {
        setProjects(response.data);
      }
    } catch (err) {
      console.error('Using default projects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-900 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12">Our Projects</h2>
      {loading ? (
        <p className="text-white">Loading projects...</p>
      ) : (
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-purple-500 hover:shadow-2xl transition-all">
              {project.image && (
                <div className="w-full h-48 mb-4 bg-gray-800 rounded-lg overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-gray-500">📷 No Image</div>';
                    }}
                  />
                </div>
              )}
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">{project.title}</h3>
              {project.tech && <p className="text-purple-400 mb-4">{project.tech}</p>}
              {project.description && <p className="text-gray-300 text-sm mb-6">{project.description}</p>}
              <button className="bg-gradient-to-r from-blue-800 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all">View Project</button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
