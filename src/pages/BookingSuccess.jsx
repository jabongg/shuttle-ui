// src/pages/BookingSuccess.jsx
import { useState } from "react";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import logo from "../images/shuttle-logo.png";
import paidStamp from "../images/paid-stamp-1.png";


export default function BookingSuccess({ bookingId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch booking details from backend
      const res = await fetch(`http://localhost:8080/bookings/${bookingId}`);
      if (!res.ok) throw new Error("Failed to fetch booking details");

      const booking = await res.json();

      // Generate PDF
      const doc = new jsPDF("landscape");

      doc.setFontSize(16);
      doc.text("Booking Confirmation", 20, 40);

//       {
//     "bookingId": 502,
//     "userName": "Priya Verma",
//     "venueName": "Elite Sports Arena",
//     "courtName": "Court C3",
//     "bookingDate": "2025-09-03",
//     "slotTime": "09:00 PM - 10:00 PM",
//     "amount": 600.0
// }
      doc.setFontSize(12);
      doc.text(`Booking ID: ${booking.bookingId}`, 20, 70);
      doc.text(`Name: ${booking.userName}`, 20, 85);
      doc.text(`Venue: ${booking.venueName}`, 20, 100);
      doc.text(`Court: ${booking.courtName}`, 20, 115);
      doc.text(`Date: ${booking.bookingDate}`, 20, 130);
      doc.text(`Slot Time: ${booking.slotTime}`, 20, 145);
      doc.text(`Amount Paid: ₹${booking.amount}`, 20, 160);


      // Add Logo at top center
      const img = new Image();
      img.src = logo;
      doc.addImage(img, "PNG", 120, 10, 50, 30);

      // Title
      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);
      doc.text("Court Booking Ticket", 150, 50, { align: "center" });

      // Generate QR Code
      const qrDataUrl = await QRCode.toDataURL(`BookingID:${bookingId}`, {
        width: 100,
      });
      doc.addImage(qrDataUrl, "PNG", 220, 70, 50, 50);

      // Add "PAID" stamp 
      const stamp = new Image();
      stamp.src = paidStamp;
      doc.addImage(stamp, "PNG", 140, 120, 50, 40);

            
      // Save PDF
      doc.save(`ticket-${bookingId}.pdf`);
    } catch (err) {
      console.error(err);
      setError("Failed to generate ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Booking Confirmed!
        </h2>
        <p className="mb-6 text-gray-700">
          Your booking ID: <span className="font-semibold">{bookingId}</span>
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleDownload}
          disabled={loading}
          className={`px-4 py-2 rounded-lg shadow-md transition w-full ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Generating Ticket..." : "⬇️ Download Ticket"}
        </button>
      </div>
    </div>
  );
}
