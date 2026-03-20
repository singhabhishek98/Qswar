import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const API_URL = 'https://qswar-admin-api-s-production.up.railway.app';

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects/allProjects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-900 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12">Our Projects</h2>
      {loading ? (
        <p className="text-white">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400">No projects available</p>
      ) : (
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-purple-500 hover:shadow-2xl transition-all">
              {project.photoUrl && (
                <div className="w-full h-48 mb-4 bg-gray-800 rounded-lg overflow-hidden">
                  <img 
                    src={project.photoUrl} 
                    alt={project.projectName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">{project.projectName}</h3>
              {project.clientName && <p className="text-gray-400 text-sm mb-2">Client: {project.clientName}</p>}
              {project.tech && (
                <p className="text-purple-400 mb-4">
                  {Array.isArray(project.tech) ? project.tech.join(', ') : project.tech}
                </p>
              )}
              {project.description && <p className="text-gray-300 text-sm mb-6">{project.description}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}