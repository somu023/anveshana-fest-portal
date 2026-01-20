import React from 'react';
import { Mail, Phone, Youtube, Instagram, Facebook, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FooterProps {
  onRegisterClick: () => void;
}

export function Footer({ onRegisterClick }: FooterProps) {
  const quickLinks = [
    { name: 'Departments', url: '#' },
    { name: 'Events', url: '#events-section' },
    { name: 'Register', action: onRegisterClick },
    { name: 'Payment', action: onRegisterClick },
    { name: 'Receipt', action: onRegisterClick }
  ];

  const socialLinks = [
    { icon: Mail, url: '#' },
    { icon: Phone, url: '#' },
    { icon: Youtube, url: '#' },
    { icon: Instagram, url: '#' },
    { icon: Facebook, url: '#' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black py-16 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ANVESHANA
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Tech & Cultural Fest – 2026<br />
              March 2026 • College Campus
            </p>
            <p className="text-sm text-gray-500">
              Join us for an unforgettable experience of innovation, creativity, and celebration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.action ? (
                    <button
                      onClick={link.action}
                      className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={link.url}
                      className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Connect With Us</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>contact@anveshana.edu</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700 hover:border-purple-500 hover:bg-purple-600/20 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 text-gray-400 hover:text-purple-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 Anveshana. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
