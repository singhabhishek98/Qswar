import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectsPage = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: "Healthcare App",
      category: "Mobile Application",
      description: "Mobile application for booking appointments, managing patient records, and telemedicine consultations.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500",
      gradient: "from-purple-500 to-pink-500",
      path: "/projects/healthcare-app"
    },
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A full-featured online shopping platform with payment integration and inventory management.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500",
      gradient: "from-blue-500 to-cyan-500",
      path: "/projects/ecommerce-platform"
    },
    {
      title: "Banking Dashboard",
      category: "Data Analytics",
      description: "Comprehensive banking dashboard with real-time analytics and transaction monitoring.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
      gradient: "from-green-500 to-emerald-500",
      path: "/projects/banking-dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our successful implementations and innovative solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => navigate(project.path)}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
              
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6 relative z-10">
                <span className={`text-sm font-semibold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-purple-400 font-semibold group-hover:gap-4 transition-all duration-300">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
