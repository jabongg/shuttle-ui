import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import { getUser } from "../utils/auth";

function BookingPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCourtId = queryParams.get("courtId") || "";

  const [venues, setVenues] = useState([]);
  const [selectedCourtInfo, setSelectedCourtInfo] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState(null);
  const [transaction, setTransaction] = useState(null);

  const formRef = useRef(null);

  // ✅ Fetch venues and find selected court info
  useEffect(() => {
    api
      .get("/venues")
      .then((res) => {
        setVenues(res.data);

        const courtInfo = res.data
          .flatMap((v) =>
            v.courts.map((c) => ({
              ...c,
              venueName: v.name,
              price: c.price || 400, // fallback if price not in DB
            }))
          )
          .find((c) => c.id.toString() === initialCourtId);

        setSelectedCourtInfo(courtInfo || null);
      })
      .catch((err) => console.error(err));
  }, [initialCourtId]);

  // ✅ Scroll to form
  useEffect(() => {
    if (formRef.current) formRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInUser = getUser();
    if (!loggedInUser) {
      setMessage({ type: "error", text: "You must be logged in to book a court." });
      return;
    }

    if (!selectedCourtInfo || !startTime || !endTime) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      setMessage({ type: "error", text: "End time must be after start time" });
      return;
    }

    try {
      const payload = {
        userId: loggedInUser.id, // ✅ UUID from backend
        courtId: selectedCourtInfo.id,
        amount: selectedCourtInfo.price,
        startTime,
        endTime,
      };

      const res = await api.post("api/payments", payload);

      setMessage({ type: "success", text: "Payment successful & booking confirmed!" });
      setTransaction(res.data); // store transaction response
      console.log("Payment + Booking response:", res.data);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Payment/Booking failed" });
    }
  };


  // startTime / endTime handlers
  const handleStartTimeChange = (e) => {
    const newStart = e.target.value;
    setStartTime(newStart);
  
    // ⏰ Auto-set end time = +1 hour in LOCAL time
    const startDate = new Date(newStart);
    if (!isNaN(startDate)) {
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  
      // format as yyyy-MM-ddTHH:mm (LOCAL)
      const pad = (num) => String(num).padStart(2, "0");
      const formatted =
        `${endDate.getFullYear()}-${pad(endDate.getMonth() + 1)}-${pad(endDate.getDate())}T` +
        `${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`;
  
      setEndTime(formatted);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book a Court</h1>

      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
        {/* Court Info */}
        {selectedCourtInfo ? (
          <div className="border rounded p-3 w-full bg-gray-100">
            <p className="font-semibold">{selectedCourtInfo.venueName} - {selectedCourtInfo.courtName}</p>
            <p className="text-gray-700">Price: ₹{selectedCourtInfo.price}</p>
          </div>
        ) : (
          <div className="text-red-500">Selected court not found.</div>
        )}

       {/* Start Time */}
        <input
          type="datetime-local"
          value={startTime}
          onChange={handleStartTimeChange}
          className="border rounded p-2 w-full"
        />

        {/* End Time (auto-filled) */}
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)} // still allow manual override
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Pay & Book
        </button>
      </form>

      {/* ✅ Show transaction summary */}
      {transaction && (
        <div className="mt-6 border p-4 rounded bg-green-50">
          <h2 className="text-lg font-semibold mb-2">Booking Summary</h2>
          <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
          <p><strong>Status:</strong> {transaction.status}</p>
          <p><strong>Amount:</strong> ₹{transaction.amount}</p>
          <p><strong>Court:</strong> {transaction.courtId}</p>
          <p><strong>Booking ID:</strong> {transaction.bookingId}</p>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
