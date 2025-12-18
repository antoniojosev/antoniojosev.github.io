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

    // Experience - Crabi
    'experience.crabi.role': 'Software Engineer',
    'experience.crabi.company': 'Crabi',
    'experience.crabi.period': 'Jul. 2024 - Present',
    'experience.crabi.location': 'Mexico • Remote',
    'experience.crabi.description': 'Developed specialized modules for Crabi\'s internal system, a leading Mexican car insurance company. Participated in developing key functionalities for the mobile application that connects end users with the company, facilitating policy management, claims, and associated services.',
    'experience.crabi.achievement1': 'Developed specialized modules for internal system infrastructure',
    'experience.crabi.achievement2': 'Built key mobile app functionalities for end-user service management',
    'experience.crabi.achievement3': 'Improved operational efficiency and enhanced user experience',
    'experience.crabi.achievement4': 'Integrated solutions optimizing collaboration with affiliated workshops',

    // Experience - SportYeah
    'experience.sportyeah.role': 'Senior Backend Developer',
    'experience.sportyeah.company': 'GESTOY (SportYeah)',
    'experience.sportyeah.period': 'Aug. 2022 - Dec. 2023',
    'experience.sportyeah.location': 'Madrid, Spain',
    'experience.sportyeah.description': 'Led backend development of SportYeah, an innovative sports-focused social network with advanced real-time communication features and blockchain integration.',
    'experience.sportyeah.achievement1': 'Led real-time chat development with direct/group messaging, video calls and socket functionality',
    'experience.sportyeah.achievement2': 'Led development of ML-powered content recommendation system',
    'experience.sportyeah.achievement3': 'Developed stories module for temporary content sharing and main social feed',
    'experience.sportyeah.achievement4': 'Led complete development of monetization and payments microservice with blockchain integration using USDT and custom token',
    'experience.sportyeah.achievement5': 'Implemented comprehensive unit testing and collaborated with QA team on integration testing',

    // Experience - BlackHost
    'experience.blackhost.role': 'Senior Backend Developer',
    'experience.blackhost.company': 'BlackHost Colombia',
    'experience.blackhost.period': 'Jun. 2022 - Aug. 2022',
    'experience.blackhost.location': 'Colombia',
    'experience.blackhost.description': 'Developed custom software solutions for BlackHost, a company specialized in tailored software development, working on diverse projects including medical platforms and remote work solutions.',
    'experience.blackhost.achievement1': 'Developed specialized modules and microservices for multiple projects including medical platforms and remote work solutions',
    'experience.blackhost.achievement2': 'Implemented massive data loading systems through CSV, PDF, and XLS files',
    'experience.blackhost.achievement3': 'Built complete monolithic projects including sports platforms and ecommerce solutions',
    'experience.blackhost.achievement4': 'Performed database adaptation and optimization',
    'experience.blackhost.achievement5': 'Managed automated deployment processes',

    // Experience - Fans And Me
    'experience.fans.role': 'Senior Backend Developer',
    'experience.fans.company': 'Fans And Me Social',
    'experience.fans.period': 'May. 2022 - Aug. 2022',
    'experience.fans.location': 'Spain',
    'experience.fans.description': 'Developed comprehensive backend infrastructure for Fans And Me Social, a social network focused on cryptocurrency and NFT commerce, implementing complex high-traffic modules and blockchain integration.',
    'experience.fans.achievement1': 'Developed main feed module for user posts and real-time chat system with group messaging, individual/group voice and video calls',
    'experience.fans.achievement2': 'Designed database models and optimization for high-traffic platform performance',
    'experience.fans.achievement3': 'Built NFT credits bank module and digital resources trading system through platform credits',
    'experience.fans.achievement4': 'Developed user profile module and statistics management system',
    'experience.fans.achievement5': 'Led monetization and payments module with blockchain integration and custom Fans cryptocurrency development',
    'experience.fans.achievement6': 'Automated media resources storage/processing, backup systems, and deployment',

    // Experience - Hipreca
    'experience.hipreca.role': 'System Manager & Full Stack Developer',
    'experience.hipreca.company': 'Distribuidora hipreca',
    'experience.hipreca.period': 'Mar. 2019 - Nov. 2021',
    'experience.hipreca.location': 'Venezuela',
    'experience.hipreca.description': 'Led complete systems department, developing automation solutions and comprehensive business management.',
    'experience.hipreca.achievement1': 'Led systems department and data management',
    'experience.hipreca.achievement2': 'Developed product lifecycle automation systems',
    'experience.hipreca.achievement3': 'Implemented recommendation system for investment and offers',
    'experience.hipreca.achievement4': 'Managed inventory, sales and complete digital presence',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Complex systems and scalable platforms that have transformed real user experiences',
    'projects.github': 'View on GitHub',
    'projects.case': 'Case Study',

    // Projects - EagleKit
    'projects.eaglekit.title': 'EagleKit - Modular Developer Toolkit',
    'projects.eaglekit.category': 'Python Package',
    'projects.eaglekit.description': 'Extensible CLI framework for project management and Git workflow automation. Built with modular plugin architecture following Domain-Driven Design principles, featuring shell integration, secure Git operations, and flexible configuration system.',
    'projects.eaglekit.metric1': 'Plugin Architecture',
    'projects.eaglekit.metric2': 'DDD Principles',
    'projects.eaglekit.metric3': 'pip/pipx Distribution',

    // Projects - SportYeah
    'projects.sportyeah.title': 'SportYeah - Sports Social Network',
    'projects.sportyeah.category': 'Senior Backend',
    'projects.sportyeah.description': 'Complete sports-focused social network with real-time chat, video calls, stories system and intelligent content recommendation.',
    'projects.sportyeah.metric1': 'Real-time chat',
    'projects.sportyeah.metric2': 'ML System',
    'projects.sportyeah.metric3': 'Unit testing',

    // Projects - Ecommerce
    'projects.ecommerce.title': 'Multi-vendor Ecommerce',
    'projects.ecommerce.category': 'Full Stack',
    'projects.ecommerce.description': 'Complete multi-vendor ecommerce platform with session management, authentication roles and advanced product tracking.',
    'projects.ecommerce.metric1': 'Multi-vendor',
    'projects.ecommerce.metric2': 'Complete CRUD',
    'projects.ecommerce.metric3': 'GitHub public',

    // Skills
    'skills.badge': 'Technical Expertise',
    'skills.title': 'Technologies & Tools',
    'skills.subtitle': 'A comprehensive toolkit built through years of hands-on experience delivering production-grade solutions',
    'skills.backend.title': 'Backend Development',
    'skills.frontend.title': 'Frontend Development',
    'skills.database.title': 'Databases',
    'skills.devops.title': 'DevOps & Tools',
    'skills.emerging.title': 'Emerging Technologies',
    'skills.level.expert': 'Expert',
    'skills.level.advanced': 'Advanced',
    'skills.level.intermediate': 'Intermediate',
    'skills.stats.technologies': 'Technologies',
    'skills.stats.frameworks': 'Frameworks',
    'skills.stats.databases': 'Databases',
    'skills.stats.years': 'Years Experience',

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

    // Experience - Crabi
    'experience.crabi.role': 'Ingeniero de Software',
    'experience.crabi.company': 'Crabi',
    'experience.crabi.period': 'Jul. 2024 - Presente',
    'experience.crabi.location': 'México • Remoto',
    'experience.crabi.description': 'Desarrollé módulos especializados para el sistema interno de Crabi, una empresa mexicana líder en seguros de autos. Participé en el desarrollo de funcionalidades clave para la aplicación móvil que conecta a los usuarios finales con la empresa, facilitando la gestión de pólizas, siniestros y servicios asociados.',
    'experience.crabi.achievement1': 'Desarrollé módulos especializados para infraestructura del sistema interno',
    'experience.crabi.achievement2': 'Construí funcionalidades clave de la app móvil para gestión de servicios de usuarios',
    'experience.crabi.achievement3': 'Mejoré la eficiencia operativa y la experiencia del usuario',
    'experience.crabi.achievement4': 'Integré soluciones optimizando la colaboración con talleres afiliados',

    // Experience - SportYeah
    'experience.sportyeah.role': 'Desarrollador Backend Senior',
    'experience.sportyeah.company': 'GESTOY (SportYeah)',
    'experience.sportyeah.period': 'Ago. 2022 - Dic. 2023',
    'experience.sportyeah.location': 'Madrid, España',
    'experience.sportyeah.description': 'Lideré el desarrollo backend de SportYeah, una red social innovadora enfocada a los deportes con características avanzadas de comunicación en tiempo real e integración blockchain.',
    'experience.sportyeah.achievement1': 'Lideré el desarrollo de chat en tiempo real con mensajería directa/grupal, videollamadas y funcionalidad de sockets',
    'experience.sportyeah.achievement2': 'Lideré el desarrollo del sistema de recomendación de contenido potenciado por ML',
    'experience.sportyeah.achievement3': 'Desarrollé el módulo de historias para compartir contenido temporal y el feed social principal',
    'experience.sportyeah.achievement4': 'Lideré el desarrollo completo del microservicio de monetización y pagos con integración blockchain usando USDT y token personalizado',
    'experience.sportyeah.achievement5': 'Implementé pruebas unitarias exhaustivas y colaboré con el equipo de QA en pruebas de integración',

    // Experience - BlackHost
    'experience.blackhost.role': 'Desarrollador Backend Senior',
    'experience.blackhost.company': 'BlackHost Colombia',
    'experience.blackhost.period': 'Jun. 2022 - Ago. 2022',
    'experience.blackhost.location': 'Colombia',
    'experience.blackhost.description': 'Desarrollé soluciones de software a medida para BlackHost, una empresa especializada en desarrollo de software personalizado, trabajando en proyectos diversos incluyendo plataformas médicas y soluciones de trabajo remoto.',
    'experience.blackhost.achievement1': 'Desarrollé módulos especializados y microservicios para múltiples proyectos incluyendo plataformas médicas y soluciones de trabajo remoto',
    'experience.blackhost.achievement2': 'Implementé sistemas de carga masiva de datos a través de archivos CSV, PDF y XLS',
    'experience.blackhost.achievement3': 'Construí proyectos monolíticos completos incluyendo plataformas deportivas y soluciones de ecommerce',
    'experience.blackhost.achievement4': 'Realicé adaptación y optimización de bases de datos',
    'experience.blackhost.achievement5': 'Gestioné procesos de despliegue automatizado',

    // Experience - Fans And Me
    'experience.fans.role': 'Desarrollador Backend Senior',
    'experience.fans.company': 'Fans And Me Social',
    'experience.fans.period': 'May. 2022 - Ago. 2022',
    'experience.fans.location': 'España',
    'experience.fans.description': 'Desarrollé infraestructura backend integral para Fans And Me Social, una red social enfocada en comercio de criptomonedas y NFT, implementando módulos complejos de alto tráfico e integración blockchain.',
    'experience.fans.achievement1': 'Desarrollé el módulo de feed principal para publicaciones de usuarios y sistema de chat en tiempo real con mensajería grupal, llamadas de voz/video individuales y grupales',
    'experience.fans.achievement2': 'Diseñé modelos de base de datos y optimización para rendimiento de plataforma de alto tráfico',
    'experience.fans.achievement3': 'Construí módulo de banco de créditos NFT y sistema de comercio de recursos digitales a través de créditos de plataforma',
    'experience.fans.achievement4': 'Desarrollé módulo de perfil de usuario y sistema de gestión de estadísticas',
    'experience.fans.achievement5': 'Lideré el módulo de monetización y pagos con integración blockchain y desarrollo de criptomoneda personalizada Fans',
    'experience.fans.achievement6': 'Automaticé almacenamiento/procesamiento de recursos multimedia, sistemas de backup y despliegue',

    // Experience - Hipreca
    'experience.hipreca.role': 'Gerente de Sistemas y Desarrollador Full Stack',
    'experience.hipreca.company': 'Distribuidora hipreca',
    'experience.hipreca.period': 'Mar. 2019 - Nov. 2021',
    'experience.hipreca.location': 'Venezuela',
    'experience.hipreca.description': 'Lideré el departamento completo de sistemas, desarrollando soluciones de automatización y gestión empresarial integral.',
    'experience.hipreca.achievement1': 'Lideré el departamento de sistemas y gestión de datos',
    'experience.hipreca.achievement2': 'Desarrollé sistemas de automatización del ciclo de vida de productos',
    'experience.hipreca.achievement3': 'Implementé sistema de recomendación para inversión y ofertas',
    'experience.hipreca.achievement4': 'Gestioné inventario, ventas y presencia digital completa',
    
    // Projects
    'projects.title': 'Proyectos Destacados',
    'projects.subtitle': 'Sistemas complejos y plataformas escalables que han transformado experiencias de usuarios reales',
    'projects.github': 'Ver en GitHub',
    'projects.case': 'Caso de Estudio',

    // Projects - EagleKit
    'projects.eaglekit.title': 'EagleKit - Kit de Herramientas Modular para Desarrolladores',
    'projects.eaglekit.category': 'Paquete Python',
    'projects.eaglekit.description': 'Framework CLI extensible para gestión de proyectos y automatización de flujos de trabajo con Git. Construido con arquitectura modular basada en plugins siguiendo principios de Domain-Driven Design, con integración de shell, operaciones Git seguras y sistema de configuración flexible.',
    'projects.eaglekit.metric1': 'Arquitectura de Plugins',
    'projects.eaglekit.metric2': 'Principios DDD',
    'projects.eaglekit.metric3': 'Distribución pip/pipx',

    // Projects - SportYeah
    'projects.sportyeah.title': 'SportYeah - Red Social Deportiva',
    'projects.sportyeah.category': 'Backend Senior',
    'projects.sportyeah.description': 'Red social completa enfocada a deportes con chat en tiempo real, videollamadas, sistema de historias y recomendación inteligente de contenido.',
    'projects.sportyeah.metric1': 'Chat en tiempo real',
    'projects.sportyeah.metric2': 'Sistema ML',
    'projects.sportyeah.metric3': 'Pruebas unitarias',

    // Projects - Ecommerce
    'projects.ecommerce.title': 'Ecommerce Multi-vendedor',
    'projects.ecommerce.category': 'Full Stack',
    'projects.ecommerce.description': 'Plataforma completa de ecommerce multi-vendedor con gestión de sesiones, roles de autenticación y seguimiento avanzado de productos.',
    'projects.ecommerce.metric1': 'Multi-vendedor',
    'projects.ecommerce.metric2': 'CRUD Completo',
    'projects.ecommerce.metric3': 'GitHub público',

    // Skills
    'skills.badge': 'Experiencia Técnica',
    'skills.title': 'Tecnologías y Herramientas',
    'skills.subtitle': 'Un conjunto integral de herramientas construido a través de años de experiencia práctica entregando soluciones de nivel producción',
    'skills.backend.title': 'Desarrollo Backend',
    'skills.frontend.title': 'Desarrollo Frontend',
    'skills.database.title': 'Bases de Datos',
    'skills.devops.title': 'DevOps y Herramientas',
    'skills.emerging.title': 'Tecnologías Emergentes',
    'skills.level.expert': 'Experto',
    'skills.level.advanced': 'Avanzado',
    'skills.level.intermediate': 'Intermedio',
    'skills.stats.technologies': 'Tecnologías',
    'skills.stats.frameworks': 'Frameworks',
    'skills.stats.databases': 'Bases de Datos',
    'skills.stats.years': 'Años de Experiencia',

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