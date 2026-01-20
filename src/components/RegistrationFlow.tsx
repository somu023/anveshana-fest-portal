import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, User, Building, BookOpen, Calendar, Check } from 'lucide-react';

interface RegistrationFlowProps {
  onComplete: (data: any, events: string[]) => void;
  onBack: () => void;
}

const allEvents = [
  { id: 'hackathon', name: 'Hackathon', category: 'Technical', price: 150 },
  { id: 'paper', name: 'Paper Presentation', category: 'Technical', price: 100 },
  { id: 'quiz', name: 'Quiz', category: 'Technical', price: 50 },
  { id: 'poster', name: 'Poster Presentation', category: 'Technical', price: 80 },
  { id: 'singing', name: 'Singing', category: 'Cultural', price: 100 },
  { id: 'dancing', name: 'Dancing', category: 'Cultural', price: 120 },
  { id: 'skit', name: 'Skit', category: 'Cultural', price: 90 },
  { id: 'ramp', name: 'Ramp Walk', category: 'Cultural', price: 100 },
  { id: 'treasure', name: 'Treasure Hunt', category: 'Central', price: 80 },
  { id: 'lucky', name: 'Lucky Draw', category: 'Central', price: 50 },
  { id: 'coding', name: 'Coding Contest', category: 'Department', price: 100 },
  { id: 'debugging', name: 'Debugging Contest', category: 'Department', price: 80 },
  { id: 'gaming', name: 'Online Gaming', category: 'Department', price: 120 }
];

export function RegistrationFlow({ onComplete, onBack }: RegistrationFlowProps) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    department: '',
    semester: ''
  });

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const handleGetOTP = () => {
    if (phone.length === 10) {
      setOtpSent(true);
      // Simulate OTP sending
      alert('OTP sent to your mobile number!');
    }
  };

  const handleVerifyOTP = () => {
    if (otp === '1234') { // Mock OTP verification
      setOtpVerified(true);
      setStep(2);
    } else {
      alert('Please enter OTP: 1234 (for demo)');
    }
  };

  const handlePersonalDetailsNext = () => {
    if (formData.name && formData.email && formData.college && formData.department && formData.semester) {
      setStep(3);
    } else {
      alert('Please fill all fields');
    }
  };

  const handleEventToggle = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      if (selectedEvents.length < 3) {
        setSelectedEvents([...selectedEvents, eventId]);
      } else {
        alert('You can only select up to 3 events');
      }
    }
  };

  const handleComplete = () => {
    if (selectedEvents.length === 0) {
      alert('Please select at least one event');
      return;
    }
    onComplete({ phone, ...formData }, selectedEvents);
  };

  return (
    <div className="min-h-screen bg-gray-950 py-16">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-8">
            Registration
          </h1>

          {/* Stepper */}
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-3 ${s <= step ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s < step ? 'bg-green-600' : s === step ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-700'
                  }`}>
                    {s < step ? <Check className="w-6 h-6" /> : s}
                  </div>
                  <span className="text-white font-medium">
                    {s === 1 ? 'Phone & OTP' : s === 2 ? 'Personal Details' : 'Event Selection'}
                  </span>
                </div>
                {s < 3 && <div className={`flex-1 h-1 ${s < step ? 'bg-green-600' : 'bg-gray-700'}`}></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Phone & OTP */}
        {step === 1 && (
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-6">Verify Your Mobile Number</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              {!otpSent && (
                <button
                  onClick={handleGetOTP}
                  disabled={phone.length !== 10}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed"
                >
                  Get OTP
                </button>
              )}

              {otpSent && (
                <>
                  <div>
                    <label className="block text-gray-300 mb-2">Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={4}
                      placeholder="Enter 4-digit OTP"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    <p className="text-sm text-gray-400 mt-2">Demo OTP: 1234</p>
                  </div>
                  <button
                    onClick={handleVerifyOTP}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-semibold transition-all duration-300"
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Personal Details */}
        {step === 2 && (
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-6">Personal Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">College</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({...formData, college: e.target.value})}
                    placeholder="Enter your college name"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Department</label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none"
                    >
                      <option value="">Select Department</option>
                      <option value="CSE">Computer Science</option>
                      <option value="ECE">Electronics</option>
                      <option value="MECH">Mechanical</option>
                      <option value="CIVIL">Civil</option>
                      <option value="EEE">Electrical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Semester</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({...formData, semester: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none"
                    >
                      <option value="">Select Semester</option>
                      {[1,2,3,4,5,6,7,8].map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePersonalDetailsNext}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Event Selection */}
        {step === 3 && (
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Select Events (Max 3)</h2>
              <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold">
                {selectedEvents.length}/3 Selected
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {allEvents.map((event) => {
                const isSelected = selectedEvents.includes(event.id);
                return (
                  <div
                    key={event.id}
                    onClick={() => handleEventToggle(event.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-2 border-purple-500 shadow-lg shadow-purple-500/20'
                        : 'bg-gray-800/50 border border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{event.name}</h3>
                        <p className="text-sm text-gray-400">{event.category}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-purple-400 font-semibold">₹{event.price}</span>
                        {isSelected && (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleComplete}
              disabled={selectedEvents.length === 0}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
