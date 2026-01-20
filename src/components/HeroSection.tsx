import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sparkles } from 'lucide-react';
import anveshanaLogo from 'figma:asset/57b182496eb417069c03e39b2d1afe3b5630fe08.png';

interface HeroSectionProps {
  onRegisterClick: () => void;
}

export function HeroSection({ onRegisterClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1658046413536-6e5933dfd939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBjcm93ZHxlbnwxfHx8fDE3Njg4NDAzOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Concert Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-[120px] text-center">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <img 
              src={anveshanaLogo}
              alt="Anveshana Logo"
              className="w-[500px] h-auto object-contain drop-shadow-2xl"
            />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              ANVESHANA
            </h1>
            <Sparkles className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-2xl text-gray-300 mb-3">Tech & Cultural Fest – 2026</p>
          <p className="text-lg text-gray-400">March 2026 • College Campus</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button 
            onClick={onRegisterClick}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/70 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Register Now
          </button>
          <button 
            onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-xl transition-all duration-300 hover:scale-105"
          >
            Explore Events
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-24 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}