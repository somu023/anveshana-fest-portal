import React, { useState } from "react";
import { ArrowLeft, CreditCard, Smartphone, Building2, CheckCircle2 } from "lucide-react";
import { supabase } from "../supabaseClient";

interface PaymentPageProps {
  selectedEvents: string[];
  registrationData: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

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
  gaming: 120,
};

const eventNames: { [key: string]: string } = {
  hackathon: "Hackathon",
  paper: "Paper Presentation",
  quiz: "Quiz",
  poster: "Poster Presentation",
  singing: "Singing",
  dancing: "Dancing",
  skit: "Skit",
  ramp: "Ramp Walk",
  treasure: "Treasure Hunt",
  lucky: "Lucky Draw",
  coding: "Coding Contest",
  debugging: "Debugging Contest",
  gaming: "Online Gaming",
};

export function PaymentPage({
  selectedEvents,
  registrationData,
  onComplete,
  onBack,
}: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalAmount = selectedEvents.reduce((sum, eventId) => sum + (eventPrices[eventId] || 0), 0);

  // ✅ generate nice transaction id
  const generateTxnId = () => {
    return "TXN" + Math.random().toString(36).substring(2, 11).toUpperCase();
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // ✅ IMPORTANT: must have student_id
    const studentId =
      registrationData?.student_id || registrationData?.studentId || registrationData?.id;

    if (!studentId) {
      alert("Student ID missing! Registration not saved properly.");
      console.log("Registration Data:", registrationData);
      return;
    }

    try {
      setLoading(true);

      const txnId = generateTxnId();

      // ✅ insert into payments table
      const { error } = await supabase.from("payments").insert([
        {
          student_id: studentId,
          amount: totalAmount,
          transaction_id: txnId,
          method: paymentMethod,
          status: "SUCCESS",
        },
      ]);

      if (error) {
        console.log("Payment Insert Error:", error);
        alert("Payment save failed: " + error.message);
        setLoading(false);
        return;
      }

      // ✅ Show success screen
      setPaymentSuccess(true);

      // ✅ pass data to receipt page
      setTimeout(() => {
        onComplete({
          method: paymentMethod,
          transactionId: txnId,
          timestamp: new Date().toISOString(),
          amount: totalAmount,
        });
      }, 800);
    } catch (err: any) {
      console.log("Payment Exception:", err);
      alert("Payment error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Payment Successful!</h2>
          <p className="text-gray-400 mb-8">Your registration has been confirmed ✅</p>
          <p className="text-gray-500 text-sm">Redirecting to receipt...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-16">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Payment Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Summary */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {selectedEvents.map((eventId) => (
                <div key={eventId} className="flex items-center justify-between py-3 border-b border-gray-700/50">
                  <span className="text-gray-300">{eventNames[eventId]}</span>
                  <span className="text-white font-semibold">Rs.{eventPrices[eventId]}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-purple-500/30">
              <div className="flex items-center justify-between text-xl font-bold mt-4">
                <span className="text-white">Total Amount</span>
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Rs.{totalAmount}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Participant Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{registrationData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{registrationData?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">College:</span>
                  <span className="text-white">{registrationData?.college}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Methods */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-6">Payment Method</h2>

            <div className="space-y-4 mb-8">
              {/* UPI */}
              <div
                onClick={() => setPaymentMethod("upi")}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  paymentMethod === "upi"
                    ? "bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-2 border-purple-500"
                    : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">UPI Payment</h3>
                    <p className="text-sm text-gray-400">Pay using UPI apps</p>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  paymentMethod === "card"
                    ? "bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-2 border-purple-500"
                    : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Credit / Debit Card</h3>
                    <p className="text-sm text-gray-400">Pay using cards</p>
                  </div>
                </div>
              </div>

              {/* Netbanking */}
              <div
                onClick={() => setPaymentMethod("netbanking")}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  paymentMethod === "netbanking"
                    ? "bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-2 border-purple-500"
                    : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Net Banking</h3>
                    <p className="text-sm text-gray-400">Pay via online banking</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={!paymentMethod || loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : `Proceed to Pay Rs.${totalAmount}`}
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
