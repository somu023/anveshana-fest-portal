import React from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function FestDetailsSection() {
  const details = [
    {
      icon: Calendar,
      title: 'Date & Timings',
      description: 'March 15-17, 2026',
      subdesc: '9:00 AM - 6:00 PM Daily',
      image: 'https://images.unsplash.com/photo-1642489069222-3b8f36c0e89e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMGRhdGUlMjBzY2hlZHVsZXxlbnwxfHx8fDE3Njg4NDA0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-purple-500/20 to-purple-900/20'
    },
    {
      icon: MapPin,
      title: 'Venue / Location',
      description: 'Main Campus Auditorium',
      subdesc: 'College Grounds & Indoor Halls',
      image: 'https://images.unsplash.com/photo-1766459842752-e06f749c0b54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwdmVudWV8ZW58MXx8fHwxNzY4ODQwNDAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-blue-500/20 to-blue-900/20'
    },
    {
      icon: Ticket,
      title: 'Pass / Entry Fee',
      description: '₹500 per participant',
      subdesc: 'Access to all 3 selected events',
      image: 'https://images.unsplash.com/photo-1652018440238-1aeb20a803a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHRpY2tldHMlMjBwYXNzfGVufDF8fHx8MTc2ODg0MDQwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-pink-500/20 to-pink-900/20'
    }
  ];

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-[120px] relative z-10">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Fest Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {/* Image Background */}
                <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300">
                  <ImageWithFallback 
                    src={detail.image}
                    alt={detail.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${detail.color}`}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{detail.title}</h3>
                  </div>
                  <p className="text-gray-200 mb-1">{detail.description}</p>
                  <p className="text-sm text-gray-400">{detail.subdesc}</p>
                </div>

                {/* Glow Effect */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
