import React from "react";
import { ArrowLeft, Download, CheckCircle, QrCode } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCodeLib from "qrcode";

interface ReceiptPageProps {
  registrationData: any;
  selectedEvents: string[];
  paymentData: any;
  onBackToHome: () => void;
}

const eventNames: Record<string, string> = {
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

const eventPrices: Record<string, number> = {
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

export function ReceiptPage({
  registrationData,
  selectedEvents,
  paymentData,
  onBackToHome,
}: ReceiptPageProps) {
  const handleDownload = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    const txn = paymentData?.transactionId || "TXN-NA";
    const paidAmount = Number(paymentData?.amount || 0);
    const method = paymentData?.method || "-";

    const dateTime = paymentData?.timestamp
      ? new Date(paymentData.timestamp).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "-";

    // ✅ Generate QR image (base64)
   const qrText = `
   ANVESHANA 2026 - PAYMENT RECEIPT
   TXN: ${txn}
   Name: ${registrationData?.name || "-"}
   Phone: ${registrationData?.phone || "-"}
   College: ${registrationData?.college || "-"}
   Dept: ${registrationData?.department || "-"}
   Sem: ${registrationData?.semester || "-"}
   Events: ${selectedEvents.map((id: string) => eventNames[id]).join(", ")}
   Amount: Rs.${paidAmount}
   Status: SUCCESS
`;

const qrDataUrl = await QRCodeLib.toDataURL(qrText.trim());


    // ✅ Header
    doc.setFillColor(20, 20, 35);
    doc.rect(0, 0, pageWidth, 30, "F");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.text("ANVESHANA 2026 – PAYMENT RECEIPT", pageWidth / 2, 18, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(220, 220, 220);
    doc.text("Tech & Cultural Fest", pageWidth / 2, 25, { align: "center" });

    // ✅ Transaction Box
    doc.setDrawColor(180);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(14, 38, pageWidth - 28, 22, 3, 3, "FD");

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(11);

    doc.setFont("helvetica", "bold");
    doc.text("Transaction ID:", 18, 48);
    doc.setFont("courier", "normal");
    doc.text(txn, 55, 48);

    doc.setFont("helvetica", "bold");
    doc.text("Date & Time:", 18, 56);
    doc.setFont("helvetica", "normal");
    doc.text(dateTime, 55, 56);

    // ✅ Student Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text("Student Details", 14, 72);

    const studentRows = [
      ["Name", String(registrationData?.name || "-")],
      ["Email", String(registrationData?.email || "-")],
      ["Mobile", String(registrationData?.phone || "-")],
      ["College", String(registrationData?.college || "-")],
      ["Department", String(registrationData?.department || "-")],
      ["Semester", String(registrationData?.semester || "-")],
    ];

    autoTable(doc, {
      startY: 76,
      head: [["Field", "Value"]],
      body: studentRows,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
        font: "helvetica",
      },
      headStyles: {
        fillColor: [60, 120, 200],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 45 },
        1: { cellWidth: pageWidth - 28 - 45 },
      },
    });

    // ✅ Events
    const finalY1 = (doc as any).lastAutoTable.finalY || 100;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Registered Events", 14, finalY1 + 12);

    const eventRows = selectedEvents.map((id, idx) => {
      const priceValue = eventPrices[id] || 0;
      return [
        String(idx + 1),
        String(eventNames[id] || id),
        `Rs.${priceValue}`, // ✅ safe format (no superscript bug)
      ];
    });

    autoTable(doc, {
      startY: finalY1 + 16,
      head: [["S.No", "Event", "Price"]],
      body: eventRows,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
        font: "helvetica",
      },
      headStyles: {
        fillColor: [20, 180, 150],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 110 },
        2: { cellWidth: 35, halign: "right", font: "courier", fontStyle: "bold" },
      },
    });

    // ✅ Total Paid box
    const finalY2 = (doc as any).lastAutoTable.finalY || finalY1 + 50;

    doc.setFillColor(235, 240, 255);
    doc.roundedRect(14, finalY2 + 10, pageWidth - 28, 22, 3, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(20, 20, 20);
    doc.text("Total Amount Paid:", 18, finalY2 + 23);

    doc.setFont("courier", "bold");
    doc.text(`Rs.${paidAmount}`, pageWidth - 20, finalY2 + 23, { align: "right" });
    doc.setFont("helvetica", "normal");

    doc.setFontSize(10);
    doc.setTextColor(70, 70, 70);
    doc.text(`Payment Method: ${method}`, 18, finalY2 + 30);

    // ✅ QR Section
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.text("QR Verification:", 14, finalY2 + 45);

    // ✅ Add QR image
    doc.addImage(qrDataUrl, "PNG", 14, finalY2 + 50, 35, 35);

    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    doc.text(txn, 55, finalY2 + 70);

    // ✅ Footer Note
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 90);
    doc.setFontSize(9);
    doc.text(
      "Note: Please carry this receipt and your College ID on fest day.",
      14,
      finalY2 + 92
    );

    doc.save(`Anveshana_Receipt_${txn}.pdf`);
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

          <p className="text-gray-400 text-lg">
            Your payment has been confirmed. Here's your receipt.
          </p>
        </div>

        {/* Receipt UI */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Anveshana 2026
            </h2>
            <p className="text-purple-100">Tech & Cultural Fest</p>
            <p className="text-purple-200 text-sm mt-2">Payment Receipt</p>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white p-6 rounded-xl">
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-gray-400" />
                </div>
                <p className="text-center text-xs text-gray-600 mt-2">
                  Scan for verification
                </p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download PDF Receipt
            </button>

            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <p className="text-sm text-yellow-200 text-center">
                ✅ Please carry this receipt and your college ID on event day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
