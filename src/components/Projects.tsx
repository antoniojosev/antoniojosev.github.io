import { ExternalLink, Users, Shield } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function Projects() {
  const { t } = useLanguage();
  const projects = [
    {
      title: "SportYeah - Sports Social Network",
      category: "Senior Backend",
      description: "Complete sports-focused social network with real-time chat, video calls, stories system and intelligent content recommendation.",
      tech: ["Django", "Django REST", "WebSockets", "PostgreSQL", "Redis", "Machine Learning"],
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=600",
      metrics: ["Real-time chat", "ML System", "Unit testing"],
      icon: Users
    },
    {
      title: "Multi-vendor Ecommerce",
      category: "Full Stack",
      description: "Complete multi-vendor ecommerce platform with session management, authentication roles and advanced product tracking.",
      tech: ["Django", "HTML", "CSS", "JavaScript", "PostgreSQL", "Auth"],
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      metrics: ["Multi-vendor", "Complete CRUD", "GitHub public"],
      icon: Shield
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('projects.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projects.map((project) => (
              <div key={project.title} className="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1">
                      <project.icon className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">{project.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">{project.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6 space-y-2">
                    {project.metrics.map((metric) => (
                      <div key={metric} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-slate-700 text-sm font-medium">{metric}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.title === "Multi-vendor Ecommerce" ? (
                      <a 
                        href="https://github.com/antoniovilav/Django-Ecomerce"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-900 hover:text-slate-600 transition-colors font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t('projects.github')}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-slate-500 font-medium">
                        <ExternalLink className="w-4 h-4" />
                        {t('projects.case')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}