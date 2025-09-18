import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function Experience() {
  const { t } = useLanguage();
  const experiences = [
    {
      role: "Software Engineer",
      company: "Crabi",
      period: "Jul. 2024 - Present",
      location: "Mexico • Remote",
      description: "Senior Backend Developer specialized in high-scalability software infrastructure and complex architecture design.",
      achievements: [
        "Development of distributed systems with Django REST framework",
        "Implementation of scalable microservices architectures",
        "Infrastructure optimization for high performance"
      ]
    },
    {
      role: "Senior Backend Developer",
      company: "GESTOY (SportYeah)",
      period: "Aug. 2022 - Dec. 2023",
      location: "Madrid, Spain",
      description: "Led backend development of SportYeah, an innovative sports social network with advanced real-time communication features.",
      achievements: [
        "Led real-time chat development with messaging, video calls and sockets",
        "Developed ML-powered content recommendation system",
        "Implemented stories module and main social network feed",
        "Collaborated with QA on comprehensive integration testing"
      ]
    },
    {
      role: "Senior Backend Developer",
      company: "BlackHost Colombia",
      period: "Jun. 2022 - Aug. 2022",
      location: "Colombia",
      description: "Development of specialized microservices and modules for multiple projects, including medical platforms and remote work solutions.",
      achievements: [
        "Developed Django microservices for diverse projects",
        "Implemented massive data loading (CSV, PDF, XLS)",
        "Built complete monolithic projects for sports and ecommerce",
        "Database optimization and automated deployment"
      ]
    },
    {
      role: "Senior Backend Developer",
      company: "Fans And Me Social",
      period: "May. 2022 - Aug. 2022",
      location: "Spain",
      description: "Development of social network focused on cryptocurrency and NFT commerce, implementing complex high-traffic modules.",
      achievements: [
        "Developed main feed module and real-time chat system",
        "Implemented NFT and digital credits trading system",
        "High-traffic optimization and automated backup",
        "Developed statistics and monetization modules"
      ]
    },
    {
      role: "System Manager & Full Stack Developer",
      company: "Distribuidora hipreca",
      period: "Mar. 2019 - Nov. 2021",
      location: "Venezuela",
      description: "Led complete systems department, developing automation solutions and comprehensive business management.",
      achievements: [
        "Led systems department and data management",
        "Developed product lifecycle automation systems",
        "Implemented recommendation system for investment and offers",
        "Managed inventory, sales and complete digital presence"
      ]
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('experience.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {t('experience.subtitle')}
            </p>
          </div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-semibold text-slate-900">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{exp.period}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-900">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">{exp.description}</p>
                    
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-slate-900 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
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