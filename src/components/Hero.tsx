import { ArrowDown, Github, Linkedin, Mail, MapPin, Download, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function Hero() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleLanguage}
          className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'ES'}</span>
          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
          <span className="text-xs text-white/60">{language === 'en' ? 'Español' : 'English'}</span>
        </button>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="relative z-10 container mx-auto px-6 flex items-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              {t('hero.availability')}
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Antonio Vila
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.title')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                {t('hero.cta')}
                <ArrowDown className="inline-block ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              
              <a 
                href="/cv.pdf" 
                download="Antonio_Vila_CV.pdf"
                className="group bg-slate-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3"
              >
                <Download className="w-4 h-4" />
                {t('hero.download')}
              </a>
              
              <div className="flex gap-4">
                <a href="https://github.com/AntonioVilaV" className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/antonio-vila/" className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:vila.antoniojose@gmail.com" className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
              <div>
                <div className="text-3xl font-bold text-white">6+</div>
                <div className="text-sm text-slate-400">{t('hero.experience')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">25+</div>
                <div className="text-sm text-slate-400">{t('hero.projects')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-sm text-slate-400">{t('hero.clients')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}