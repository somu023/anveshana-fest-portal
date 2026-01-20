import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react";

export function VerifyPage() {
  const { txnId } = useParams();
  const [loading, setLoading] = useState(true);

  const [payment, setPayment] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadVerification = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        // ✅ 1) Get payment record
        const { data: payData, error: payErr } = await supabase
          .from("payments")
          .select("*")
          .eq("transaction_id", txnId)
          .single();

        if (payErr || !payData) {
          setErrorMsg("Invalid Transaction ID / Payment not found.");
          setLoading(false);
          return;
        }

        setPayment(payData);

        // ✅ 2) Get student details
        const { data: stuData, error: stuErr } = await supabase
          .from("students")
          .select("*")
          .eq("id", payData.student_id)
          .single();

        if (stuErr || !stuData) {
          setErrorMsg("Student details not found.");
          setLoading(false);
          return;
        }

        setStudent(stuData);

        // ✅ 3) Get event selections
        const { data: eventData, error: eventErr } = await supabase
          .from("event_selections")
          .select("*")
          .eq("student_id", payData.student_id);

        if (!eventErr && eventData) setEvents(eventData);

        setLoading(false);
      } catch (err: any) {
        setErrorMsg("Something went wrong: " + err.message);
        setLoading(false);
      }
    };

    loadVerification();
  }, [txnId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-950">
        Loading verification...
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-gray-900 border border-white/10 rounded-2xl p-8 text-white text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-red-400 mb-3">Not Verified</h1>
          <p className="text-gray-300 mb-6">{errorMsg}</p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold"
          >
            <ArrowLeft className="w-5 h-5" /> Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-gray-900 border border-white/10 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
          <div>
            <h1 className="text-3xl font-bold text-green-400">Payment Verified ✅</h1>
            <p className="text-gray-400 text-sm">Anveshana 2026 Verification Portal</p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-gray-800/40 rounded-xl p-5 mb-6 border border-white/10">
          <p className="text-gray-300">
            <b>Transaction ID:</b> <span className="font-mono">{payment.transaction_id}</span>
          </p>
          <p className="text-gray-300">
            <b>Status:</b>{" "}
            <span className="text-green-300 font-semibold">{payment.status}</span>
          </p>
          <p className="text-gray-300">
            <b>Amount Paid:</b> Rs.{payment.amount}
          </p>
          <p className="text-gray-300 capitalize">
            <b>Method:</b> {payment.method}
          </p>
        </div>

        {/* Student Info */}
        <h2 className="text-xl font-semibold mb-3">Student Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800/30 rounded-xl p-5 border border-white/10 mb-6">
          <p><b>Name:</b> {student.name}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Phone:</b> {student.phone}</p>
          <p><b>College:</b> {student.college}</p>
          <p><b>Department:</b> {student.department}</p>
          <p><b>Semester:</b> {student.semester}</p>
        </div>

        {/* Events */}
        <h2 className="text-xl font-semibold mb-3">Registered Events</h2>
        <div className="bg-gray-800/30 rounded-xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-800 text-gray-200 font-semibold px-4 py-3">
            <span>S.No</span>
            <span>Event</span>
            <span className="text-right">Price</span>
          </div>

          {events.length === 0 ? (
            <div className="p-4 text-gray-400">No events found</div>
          ) : (
            events.map((ev, i) => (
              <div
                key={ev.id}
                className="grid grid-cols-3 px-4 py-3 border-t border-white/10 text-gray-300"
              >
                <span>{i + 1}</span>
                <span>{ev.event_name || ev.event_id}</span>
                <span className="text-right">Rs.{ev.price}</span>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
