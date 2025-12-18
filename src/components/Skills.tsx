import { Code2, Database, Wrench, Sparkles, Layers, Terminal } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function Skills() {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t('skills.backend.title'),
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Python', level: 'expert' },
        { name: 'Django', level: 'expert' },
        { name: 'PHP', level: 'expert' },
        { name: 'Symfony', level: 'expert' },
        { name: 'Laravel', level: 'advanced' },
        { name: 'Node.js', level: 'expert' },
        { name: 'Java', level: 'advanced' },
        { name: 'Spring Boot', level: 'advanced' },
        { name: 'C#', level: 'intermediate' }
      ]
    },
    {
      title: t('skills.frontend.title'),
      icon: Layers,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'React', level: 'expert' },
        { name: 'React Native', level: 'advanced' },
        { name: 'Vue.js', level: 'advanced' },
        { name: 'TypeScript', level: 'expert' },
        { name: 'JavaScript', level: 'expert' },
        { name: 'HTML/CSS', level: 'expert' },
        { name: 'Tailwind CSS', level: 'expert' }
      ]
    },
    {
      title: t('skills.database.title'),
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'PostgreSQL', level: 'expert' },
        { name: 'MySQL', level: 'expert' },
        { name: 'MongoDB', level: 'advanced' },
        { name: 'Elasticsearch', level: 'intermediate' }
      ]
    },
    {
      title: t('skills.devops.title'),
      icon: Terminal,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'AWS', level: 'advanced' },
        { name: 'Docker', level: 'expert' },
        { name: 'Git', level: 'expert' }
      ]
    },
    {
      title: t('skills.emerging.title'),
      icon: Sparkles,
      color: 'from-indigo-500 to-violet-500',
      skills: [
        { name: 'Machine Learning', level: 'intermediate' },
        { name: 'Web3', level: 'advanced' },
        { name: 'Blockchain', level: 'advanced' }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'bg-green-500';
      case 'advanced':
        return 'bg-blue-500';
      case 'intermediate':
        return 'bg-yellow-500';
      default:
        return 'bg-slate-400';
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'expert':
        return 'w-full';
      case 'advanced':
        return 'w-4/5';
      case 'intermediate':
        return 'w-3/5';
      default:
        return 'w-2/5';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Wrench className="w-4 h-4" />
              <span>{t('skills.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('skills.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('skills.subtitle')}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium text-sm">
                          {skill.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full text-white ${getLevelColor(skill.level)}`}>
                          {t(`skills.level.${skill.level}`)}
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)} rounded-full transition-all duration-500 group-hover:animate-pulse`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-slate-900 mb-2">30+</div>
              <div className="text-slate-600 text-sm font-medium">{t('skills.stats.technologies')}</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-slate-900 mb-2">10+</div>
              <div className="text-slate-600 text-sm font-medium">{t('skills.stats.frameworks')}</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-slate-900 mb-2">5+</div>
              <div className="text-slate-600 text-sm font-medium">{t('skills.stats.databases')}</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-slate-900 mb-2">6+</div>
              <div className="text-slate-600 text-sm font-medium">{t('skills.stats.years')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
