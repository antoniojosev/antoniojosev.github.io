import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function Experience() {
  const { t } = useLanguage();

  const experiences = [
    {
      role: t('experience.crabi.role'),
      company: t('experience.crabi.company'),
      period: t('experience.crabi.period'),
      location: t('experience.crabi.location'),
      description: t('experience.crabi.description'),
      achievements: [
        t('experience.crabi.achievement1'),
        t('experience.crabi.achievement2'),
        t('experience.crabi.achievement3'),
        t('experience.crabi.achievement4')
      ]
    },
    {
      role: t('experience.sportyeah.role'),
      company: t('experience.sportyeah.company'),
      period: t('experience.sportyeah.period'),
      location: t('experience.sportyeah.location'),
      description: t('experience.sportyeah.description'),
      achievements: [
        t('experience.sportyeah.achievement1'),
        t('experience.sportyeah.achievement2'),
        t('experience.sportyeah.achievement3'),
        t('experience.sportyeah.achievement4'),
        t('experience.sportyeah.achievement5')
      ]
    },
    {
      role: t('experience.blackhost.role'),
      company: t('experience.blackhost.company'),
      period: t('experience.blackhost.period'),
      location: t('experience.blackhost.location'),
      description: t('experience.blackhost.description'),
      achievements: [
        t('experience.blackhost.achievement1'),
        t('experience.blackhost.achievement2'),
        t('experience.blackhost.achievement3'),
        t('experience.blackhost.achievement4'),
        t('experience.blackhost.achievement5')
      ]
    },
    {
      role: t('experience.fans.role'),
      company: t('experience.fans.company'),
      period: t('experience.fans.period'),
      location: t('experience.fans.location'),
      description: t('experience.fans.description'),
      achievements: [
        t('experience.fans.achievement1'),
        t('experience.fans.achievement2'),
        t('experience.fans.achievement3'),
        t('experience.fans.achievement4'),
        t('experience.fans.achievement5'),
        t('experience.fans.achievement6')
      ]
    },
    {
      role: t('experience.hipreca.role'),
      company: t('experience.hipreca.company'),
      period: t('experience.hipreca.period'),
      location: t('experience.hipreca.location'),
      description: t('experience.hipreca.description'),
      achievements: [
        t('experience.hipreca.achievement1'),
        t('experience.hipreca.achievement2'),
        t('experience.hipreca.achievement3'),
        t('experience.hipreca.achievement4')
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