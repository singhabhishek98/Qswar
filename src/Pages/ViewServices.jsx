import { Code, Smartphone, Cloud, Shield, Brain, BarChart3, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const ViewServices = () => {
  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies like React, Node.js, and more.",
      features: ["Responsive Design", "SEO Optimized", "Fast Performance"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android with seamless user experience.",
      features: ["iOS & Android", "Cross-Platform", "Native Performance"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services using AWS, Azure, and Google Cloud.",
      features: ["AWS Certified", "Auto Scaling", "99.9% Uptime"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your business from cyber threats and vulnerabilities.",
      features: ["Threat Detection", "Data Encryption", "24/7 Monitoring"],
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI Integration",
      description: "Integrate cutting-edge AI and machine learning solutions to automate and optimize your business.",
      features: ["Machine Learning", "NLP", "Automation"],
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Data Analytics",
      description: "Transform your data into actionable insights with advanced analytics and visualization tools.",
      features: ["Real-time Analytics", "Custom Dashboards", "Predictive Insights"],
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-semibold">Premium Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge solutions designed to elevate your business to new heights
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="flex items-center gap-2 text-purple-400 font-semibold group-hover:gap-4 transition-all duration-300">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:30px_30px]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8">Let's build something amazing together</p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewServices;
