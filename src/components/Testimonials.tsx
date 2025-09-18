import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      content: "Antonio's strategic vision and technical expertise were instrumental in our successful digital transformation. His ability to translate complex technical concepts into business value is unmatched.",
      author: "Sarah Chen",
      role: "CTO, GlobalTech Solutions",
      company: "Fortune 500 Company",
      rating: 5
    },
    {
      content: "Working with Antonio as our technical advisor was game-changing. His architectural guidance helped us scale from startup to serving millions of users while maintaining code quality.",
      author: "Marcus Rodriguez",
      role: "Founder & CEO",
      company: "TechStart Inc.",
      rating: 5
    },
    {
      content: "Antonio brings a unique combination of deep technical knowledge and business acumen. His consulting helped us identify and implement solutions that drove significant cost savings.",
      author: "Jennifer Walsh",
      role: "VP of Engineering",
      company: "InnovateCorp",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Client Testimonials
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Trusted by leaders across the industry for strategic technical guidance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-800 p-8 rounded-2xl relative hover:bg-slate-750 transition-colors duration-300">
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                    <Quote className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-200 leading-relaxed text-lg">"{testimonial.content}"</p>
                </div>
                
                <div className="border-t border-slate-700 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.author}</div>
                      <div className="text-slate-400 text-sm">{testimonial.role}</div>
                      <div className="text-slate-500 text-xs">{testimonial.company}</div>
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