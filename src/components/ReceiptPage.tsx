import React from 'react';
import { ArrowLeft, Download, CheckCircle, QrCode } from 'lucide-react';

interface ReceiptPageProps {
  registrationData: any;
  selectedEvents: string[];
  paymentData: any;
  onBackToHome: () => void;
}

const eventNames: { [key: string]: string } = {
  hackathon: 'Hackathon',
  paper: 'Paper Presentation',
  quiz: 'Quiz',
  poster: 'Poster Presentation',
  singing: 'Singing',
  dancing: 'Dancing',
  skit: 'Skit',
  ramp: 'Ramp Walk',
  treasure: 'Treasure Hunt',
  lucky: 'Lucky Draw',
  coding: 'Coding Contest',
  debugging: 'Debugging Contest',
  gaming: 'Online Gaming'
};

const eventPrices: { [key: string]: number } = {
  hackathon: 150,
  paper: 100,
  quiz: 50,
  poster: 80,
  singing: 100,
  dancing: 120,
  skit: 90,
  ramp: 100,
  treasure: 80,
  lucky: 50,
  coding: 100,
  debugging: 80,
  gaming: 120
};

export function ReceiptPage({ registrationData, selectedEvents, paymentData, onBackToHome }: ReceiptPageProps) {
  const handleDownload = () => {
    alert('Receipt download will start... (Demo)');
  };

  return (
    <div className="min-h-screen bg-gray-950 py-16">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Registration Complete!
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Your payment has been confirmed. Here's your receipt.</p>
        </div>

        {/* Receipt Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          {/* Receipt Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Anveshana 2026</h2>
              <p className="text-purple-100">Tech & Cultural Fest</p>
              <p className="text-purple-200 text-sm mt-2">Payment Receipt</p>
            </div>
          </div>

          {/* Receipt Body */}
          <div className="p-8">
            {/* Transaction Info */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Transaction ID</p>
                  <p className="font-mono text-white font-semibold">{paymentData?.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Date & Time</p>
                  <p className="text-white">
                    {new Date(paymentData?.timestamp).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Participant Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded"></div>
                Participant Details
              </h3>
              <div className="grid grid-cols-2 gap-4 bg-gray-800/30 rounded-xl p-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Name</p>
                  <p className="text-white font-medium">{registrationData?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <p className="text-white font-medium">{registrationData?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">College</p>
                  <p className="text-white font-medium">{registrationData?.college}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Department</p>
                  <p className="text-white font-medium">{registrationData?.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Semester</p>
                  <p className="text-white font-medium">{registrationData?.semester}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Mobile</p>
                  <p className="text-white font-medium">{registrationData?.phone}</p>
                </div>
              </div>
            </div>

            {/* Registered Events */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded"></div>
                Registered Events
              </h3>
              <div className="bg-gray-800/30 rounded-xl p-6">
                {selectedEvents.map((eventId, index) => (
                  <div
                    key={eventId}
                    className={`flex items-center justify-between py-3 ${
                      index < selectedEvents.length - 1 ? 'border-b border-gray-700/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full flex items-center justify-center border border-purple-500/30">
                        <span className="text-sm text-purple-300 font-semibold">{index + 1}</span>
                      </div>
                      <span className="text-white font-medium">{eventNames[eventId]}</span>
                    </div>
                    <span className="text-gray-300">₹{eventPrices[eventId]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amount Details */}
            <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/30 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300">Total Amount Paid</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  ₹{paymentData?.amount}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Payment Method</span>
                <span className="text-gray-300 capitalize">{paymentData?.method}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white p-6 rounded-xl">
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-gray-400" />
                </div>
                <p className="text-center text-xs text-gray-600 mt-2">Scan for verification</p>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download PDF Receipt
            </button>

            {/* Footer Note */}
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <p className="text-sm text-yellow-200 text-center">
                📧 A copy of this receipt has been sent to your email. Please carry this receipt and your college ID on the event day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
