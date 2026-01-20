import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { FestDetailsSection } from './components/FestDetailsSection';
import { EventsSection } from './components/EventsSection';
import { RegistrationFlow } from './components/RegistrationFlow';
import { PaymentPage } from './components/PaymentPage';
import { ReceiptPage } from './components/ReceiptPage';
import { VideosSection } from './components/VideosSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'register' | 'payment' | 'receipt'>('home');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  const handleRegisterClick = () => {
    setCurrentPage('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationComplete = (data: any, events: string[]) => {
    setRegistrationData(data);
    setSelectedEvents(events);
    setCurrentPage('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentComplete = (data: any) => {
    setPaymentData(data);
    setCurrentPage('receipt');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'register') {
    return (
      <RegistrationFlow 
        onComplete={handleRegistrationComplete}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentPage === 'payment') {
    return (
      <PaymentPage 
        selectedEvents={selectedEvents}
        registrationData={registrationData}
        onComplete={handlePaymentComplete}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentPage === 'receipt') {
    return (
      <ReceiptPage 
        registrationData={registrationData}
        selectedEvents={selectedEvents}
        paymentData={paymentData}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <HeroSection onRegisterClick={handleRegisterClick} />
      <FestDetailsSection />
      <EventsSection />
      <VideosSection />
      <ContactSection />
      <Footer onRegisterClick={handleRegisterClick} />
    </div>
  );
}
