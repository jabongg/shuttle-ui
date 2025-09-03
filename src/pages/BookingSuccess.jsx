// src/pages/BookingSuccess.jsx
import { useState } from "react";
import api from "../api/axios";

export default function BookingSuccess({ bookingId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Ticket download handler
  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/api/bookings/${bookingId}/ticket`, {
        responseType: "blob", // important for PDF download
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ticket-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.error("❌ Error downloading ticket:", err);
      setError("Failed to download ticket. Please try again.");
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
