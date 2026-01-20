import React from 'react';
import { EventCarousel } from './EventCarousel';
import { ChevronRight, CheckCircle } from 'lucide-react';

export function EventsSection() {
  const technicalEvents = [
    {
      title: 'Hackathon',
      description: '24-hour coding marathon to build innovative solutions',
      image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjBjb2RpbmclMjBldmVudHxlbnwxfHx8fDE3Njg3Njg5ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 150
    },
    {
      title: 'Paper Presentation',
      description: 'Present your research and innovative ideas',
      image: 'https://images.unsplash.com/photo-1532618261731-e3346f1705bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMHByZXNlbnRhdGlvbiUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzY4ODQwMzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 100
    },
    {
      title: 'Quiz',
      description: 'Test your knowledge across various tech domains',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=500',
      price: 50
    },
    {
      title: 'Poster Presentation',
      description: 'Showcase your project with visual presentations',
      image: 'https://images.unsplash.com/photo-1767706508363-b2a729df06fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3N0ZXIlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzY4ODQwMzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 80
    }
  ];

  const culturalEvents = [
    {
      title: 'Singing',
      description: 'Mesmerize the audience with your vocal talent',
      image: 'https://images.unsplash.com/photo-1741787649188-376a45726ece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5naW5nJTIwcGVyZm9ybWFuY2UlMjBjb25jZXJ0fGVufDF8fHx8MTc2ODg0MDM5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 100
    },
    {
      title: 'Dancing',
      description: 'Show your moves in solo or group performances',
      image: 'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHBlcmZvcm1hbmNlJTIwc3RhZ2V8ZW58MXx8fHwxNzY4NzkyNzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 120
    },
    {
      title: 'Skit',
      description: 'Perform dramatic acts and showcase acting skills',
      image: 'https://images.unsplash.com/photo-1747155827634-012749f4eca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwc2tpdCUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc2ODg0MDM5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 90
    },
    {
      title: 'Ramp Walk',
      description: 'Strut the runway and showcase fashion excellence',
      image: 'https://images.unsplash.com/photo-1663194815427-d4d011fa6e29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcmFtcCUyMHdhbGt8ZW58MXx8fHwxNzY4ODQwMzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 100
    }
  ];

  const centralEvents = [
    {
      title: 'Treasure Hunt',
      description: 'Solve clues and find hidden treasures across campus',
      image: 'https://images.unsplash.com/photo-1645563113686-d05ddb732d9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVhc3VyZSUyMGh1bnQlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzY4ODQwMzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 80
    },
    {
      title: 'Lucky Draw',
      description: 'Win exciting prizes through lucky draw contests',
      image: 'https://images.unsplash.com/photo-1651439372230-6a8f1c2aa597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdWNreSUyMGRyYXclMjByYWZmbGV8ZW58MXx8fHwxNzY4ODQwMzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 50
    }
  ];

  const departmentEvents = [
    {
      title: 'Coding Contest',
      description: 'Competitive programming challenges and algorithms',
      image: 'https://images.unsplash.com/photo-1562758778-e5638b5b6607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBjb21wZXRpdGlvbiUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc2ODg0MDQwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 100
    },
    {
      title: 'Debugging Contest',
      description: 'Find and fix bugs in complex code',
      image: 'https://images.unsplash.com/photo-1763568258817-8814c9d3a9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWJ1Z2dpbmclMjBjb2RlJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzY4ODQwNDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 80
    },
    {
      title: 'Online Gaming',
      description: 'Compete in popular esports tournaments',
      image: 'https://images.unsplash.com/photo-1767455471543-055dbc6c6700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjB0b3VybmFtZW50JTIwZXNwb3J0c3xlbnwxfHx8fDE3Njg4MTI2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 120
    }
  ];

  const guidelines = [
    'Carry College ID at all times',
    'Be on time for your events',
    'Follow coordinator instructions',
    'No cheating or malpractice allowed',
    'Judge\'s decision is final'
  ];

  return (
    <section id="events-section" className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-[1200px] mx-auto px-[120px]">
        
        {/* Technical Events */}
        <div className="mb-32">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Technical Events
          </h2>
          <EventCarousel events={technicalEvents} />
        </div>

        {/* Cultural Events */}
        <div className="mb-32">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Cultural Events
          </h2>
          <EventCarousel events={culturalEvents} />
        </div>

        {/* Central Events + Guidelines */}
        <div className="mb-32">
          <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Central Events
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Central Event Cards */}
            {centralEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
            
            {/* Guidelines Card */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-yellow-500/50 transition-all duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Guidelines / Rules</h3>
              </div>
              <ul className="space-y-3">
                {guidelines.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <ChevronRight className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Department Events */}
        <div>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Department Events
          </h2>
          <EventCarousel events={departmentEvents} />
        </div>
      </div>
    </section>
  );
}

interface EventCardProps {
  event: {
    title: string;
    description: string;
    image: string;
    price: number;
  };
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
          ₹{event.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
        <p className="text-sm text-gray-400 mb-4">{event.description}</p>
        <button className="w-full py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 hover:border-purple-500 text-purple-300 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-blue-600/30">
          View Rules
        </button>
      </div>

      {/* Glow Effect */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}
