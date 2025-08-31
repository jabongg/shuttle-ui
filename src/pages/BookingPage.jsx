import { useState } from "react";
import api from "../api/axios";

function BookingPage() {
  const [courtId, setCourtId] = useState("");
  const [userId, setUserId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/bookings", {
        courtId,
        userId,
        startTime,
        endTime,
      });
      alert("Booking confirmed: " + JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Book a Court</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="number"
          placeholder="Court ID"
          value={courtId}
          onChange={(e) => setCourtId(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Book
        </button>
      </form>
    </div>
  );
}

export default BookingPage;
