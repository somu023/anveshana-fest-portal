import React, { useState } from 'react';
import { Send, Mail, Phone, Youtube, Instagram, Facebook } from 'lucide-react';

export function ContactSection() {
  const [query, setQuery] = useState('');

  const departments = [
    {
      name: 'Tech Department',
      phone: '+91 98765 43210',
      email: 'tech@anveshana.edu'
    },
    {
      name: 'Cultural Department',
      phone: '+91 98765 43211',
      email: 'cultural@anveshana.edu'
    },
    {
      name: 'Admin / Help Desk',
      phone: '+91 98765 43212',
      email: 'help@anveshana.edu'
    }
  ];

  const socialLinks = [
    { icon: Mail, label: 'Email', url: '#', color: 'text-red-400' },
    { icon: Phone, label: 'Phone', url: '#', color: 'text-green-400' },
    { icon: Youtube, label: 'YouTube', url: '#', color: 'text-red-500' },
    { icon: Instagram, label: 'Instagram', url: '#', color: 'text-pink-400' },
    { icon: Facebook, label: 'Facebook', url: '#', color: 'text-blue-500' }
  ];

  const handleSendQuery = () => {
    if (query.trim()) {
      alert('Query submitted successfully! We will get back to you soon.');
      setQuery('');
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-[120px] relative z-10">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Query Form */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-6">Send Your Query</h3>
            
            <div className="space-y-4">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your query here..."
                rows={6}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              />
              
              <button
                onClick={handleSendQuery}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Query
              </button>
            </div>
          </div>

          {/* Department Contacts */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Department Contacts</h3>
            
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <h4 className="text-lg font-semibold text-white mb-4">{dept.name}</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{dept.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{dept.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-white mb-8">Connect With Us</h3>
          
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  className="group"
                  aria-label={social.label}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20">
                    <Icon className={`w-6 h-6 ${social.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
