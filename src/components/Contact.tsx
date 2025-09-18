import React, { useState } from 'react';
import { Mail, MessageSquare, Calendar, MapPin, ArrowRight, Download, Copy, Check } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function Contact() {
  const { t } = useLanguage();
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);
  const phoneNumber = '+584125834984';

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 mb-4 sm:mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0">
            {t('contact.subtitle')}
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="group p-6 sm:p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">{t('contact.consultation')}</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-6">{t('contact.consultation.desc')}</p>
            </div>
            
            <div className="group p-6 sm:p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">{t('contact.retainer')}</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-6">{t('contact.retainer.desc')}</p>
            </div>
            
            <div className="group p-6 sm:p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">{t('contact.review')}</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-6">{t('contact.review.desc')}</p>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base text-center">{t('contact.location')}</span>
            </div>
            
            <div className="flex flex-col gap-4 justify-center items-center">
              <a 
                href="mailto:vila.antoniojose@gmail.com"
                className="group bg-white text-slate-900 px-6 sm:px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="truncate">vila.antoniojose@gmail.com</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </a>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {!showPhone ? (
                  <button 
                    onClick={() => setShowPhone(true)}
                    className="border-2 border-white/30 text-white px-6 sm:px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto text-sm sm:text-base"
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t('contact.schedule')}
                  </button>
                ) : (
                  <div className="border-2 border-white/30 text-white px-6 sm:px-8 py-4 rounded-full font-semibold bg-white/10 flex items-center justify-center gap-3 animate-pulse w-full sm:w-auto text-sm sm:text-base">
                    <span className="font-mono">{phoneNumber}</span>
                    <button
                      onClick={handleCopyPhone}
                      className="p-1 hover:bg-white/20 rounded transition-all duration-200"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                )}
                
                <a 
                  href="/cv.pdf" 
                  download="Antonio_Vila_CV.pdf"
                  className="border-2 border-white/30 text-white px-6 sm:px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto text-sm sm:text-base"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t('contact.download')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}