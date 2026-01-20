import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  title: string;
  description: string;
  image: string;
  price: number;
}

interface EventCarouselProps {
  events: Event[];
}

export function EventCarousel({ events }: EventCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;
  const maxIndex = Math.max(0, events.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}
      
      {currentIndex < maxIndex && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div 
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView + 1.5)}%)`
          }}
        >
          {events.map((event, index) => (
            <div key={index} className="flex-shrink-0 w-[calc(25%-18px)]">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'w-8 bg-gradient-to-r from-purple-500 to-blue-500' 
                : 'w-2 bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

interface EventCardProps {
  event: Event;
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
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{event.description}</p>
        <button className="w-full py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 hover:border-purple-500 text-purple-300 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-blue-600/30">
          View Rules
        </button>
      </div>

      {/* Glow Effect */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}
