import { Code, Users, Lightbulb, TrendingUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function About() {
  const { t } = useLanguage();
  
  const expertise = [
    {
      icon: Code,
      titleKey: "about.tech.title",
      descriptionKey: "about.tech.description"
    },
    {
      icon: Users,
      titleKey: "about.team.title",
      descriptionKey: "about.team.description"
    },
    {
      icon: Lightbulb,
      titleKey: "about.strategy.title",
      descriptionKey: "about.strategy.description"
    },
    {
      icon: TrendingUp,
      titleKey: "about.digital.title",
      descriptionKey: "about.digital.description"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('about.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((item) => (
              <div 
                key={item.titleKey}
                className="group p-8 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{t(item.titleKey)}</h3>
                <p className="text-slate-600 leading-relaxed">{t(item.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}