import React, { createContext, useState, ReactNode, useMemo, useCallback } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero
    'hero.availability': 'Available for Freelance & Projects',
    'hero.title': 'Senior Software Engineer & Technical Advisor helping enterprises transform their technology landscape through strategic innovation',
    'hero.cta': 'View My Work',
    'hero.download': 'Download CV',
    'hero.experience': 'Years Experience',
    'hero.projects': 'Projects Delivered',
    'hero.clients': 'Clients Served',
    
    // About
    'about.title': 'Bridging Technology & Business',
    'about.description': 'With over a decade of experience in software development and technical leadership, I specialize in helping organizations navigate complex technical challenges while delivering measurable business outcomes.',
    'about.tech.title': 'Technical Architecture',
    'about.tech.description': 'Designing scalable, maintainable software architectures that drive business growth',
    'about.team.title': 'Team Leadership',
    'about.team.description': 'Mentoring development teams and establishing best practices for sustainable growth',
    'about.strategy.title': 'Strategic Innovation',
    'about.strategy.description': 'Identifying technology opportunities that create competitive advantages',
    'about.digital.title': 'Digital Transformation',
    'about.digital.description': 'Guiding organizations through complex technology modernization initiatives',
    
    // Experience
    'experience.title': 'Professional Journey',
    'experience.subtitle': 'My career path in software development and technical leadership',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Complex systems and scalable platforms that have transformed real user experiences',
    'projects.github': 'View on GitHub',
    'projects.case': 'Case Study',
    
    // Contact
    'contact.title': 'Let\'s Work Together',
    'contact.subtitle': 'Have a project in mind? I\'d love to hear your ideas and help you create technological solutions that drive your business forward.',
    'contact.consultation': 'Strategic Consultation',
    'contact.consultation.desc': 'Comprehensive technical strategy sessions to align technology with business objectives.',
    'contact.retainer': 'Advisory Retainer',
    'contact.retainer.desc': 'Ongoing technical guidance and support for your development team and projects.',
    'contact.review': 'Project Review',
    'contact.review.desc': 'Technical audits and recommendations for existing projects and architecture.',
    'contact.location': 'Based in Venezuela • Available Worldwide',
    'contact.schedule': 'Schedule a Call',
    'contact.download': 'Download CV',
  },
  es: {
    // Hero
    'hero.availability': 'Disponible para Freelance y Proyectos',
    'hero.title': 'Senior Software Engineer & Technical Advisor especializado en ayudar a empresas a transformar su panorama tecnológico através de innovación estratégica',
    'hero.cta': 'Ver Mi Trabajo',
    'hero.download': 'Descargar CV',
    'hero.experience': 'Años Experiencia',
    'hero.projects': 'Proyectos Entregados',
    'hero.clients': 'Clientes Atendidos',
    
    // About
    'about.title': 'Conectando Tecnología y Negocio',
    'about.description': 'Con más de una década de experiencia en desarrollo de software y liderazgo técnico, me especializo en ayudar a organizaciones a navegar desafíos técnicos complejos mientras entrego resultados empresariales medibles.',
    'about.tech.title': 'Arquitectura Técnica',
    'about.tech.description': 'Diseñando arquitecturas de software escalables y mantenibles que impulsan el crecimiento empresarial',
    'about.team.title': 'Liderazgo de Equipos',
    'about.team.description': 'Mentorizando equipos de desarrollo y estableciendo mejores prácticas para crecimiento sostenible',
    'about.strategy.title': 'Innovación Estratégica',
    'about.strategy.description': 'Identificando oportunidades tecnológicas que crean ventajas competitivas',
    'about.digital.title': 'Transformación Digital',
    'about.digital.description': 'Guiando organizaciones a través de iniciativas complejas de modernización tecnológica',
    
    // Experience
    'experience.title': 'Trayectoria Profesional',
    'experience.subtitle': 'Mi carrera en desarrollo de software y liderazgo técnico',
    
    // Projects
    'projects.title': 'Proyectos Destacados',
    'projects.subtitle': 'Sistemas complejos y plataformas escalables que han transformado experiencias de usuarios reales',
    'projects.github': 'Ver en GitHub',
    'projects.case': 'Caso de Estudio',
    
    // Contact
    'contact.title': 'Trabajemos Juntos',
    'contact.subtitle': '¿Tienes un proyecto en mente? Me encantaría conocer tus ideas y ayudarte a crear soluciones tecnológicas que impulsen tu negocio.',
    'contact.consultation': 'Consultoría Estratégica',
    'contact.consultation.desc': 'Sesiones integrales de estrategia técnica para alinear tecnología con objetivos empresariales.',
    'contact.retainer': 'Asesoría Continua',
    'contact.retainer.desc': 'Orientación técnica continua y soporte para tu equipo de desarrollo y proyectos.',
    'contact.review': 'Revisión de Proyectos',
    'contact.review.desc': 'Auditorías técnicas y recomendaciones para proyectos y arquitectura existentes.',
    'contact.location': 'Basado en Venezuela • Disponible en Todo el Mundo',
    'contact.schedule': 'Agendar Llamada',
    'contact.download': 'Descargar CV',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export { LanguageContext };

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  }, [language]);

  const value = useMemo(() => ({
    language,
    toggleLanguage,
    t
  }), [language, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};