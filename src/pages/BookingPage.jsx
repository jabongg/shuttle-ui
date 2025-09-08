import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import { getUser } from "../utils/auth";
import BookingSuccess from "./BookingSuccess";

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

  // Fetch venues
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
              price: c.price || 400,
            }))
          )
          .find((c) => c.id.toString() === initialCourtId);

        setSelectedCourtInfo(courtInfo || null);
      })
      .catch((err) => console.error(err));
  }, [initialCourtId]);

  // Scroll to form
  useEffect(() => {
    if (formRef.current) formRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  // OLD FLOW → Direct API booking
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
        userId: loggedInUser.id,
        courtId: selectedCourtInfo.id,
        amount: selectedCourtInfo.price,
        startTime,
        endTime,
      };

      const res = await api.post("/api/payments", payload);

      setMessage({ type: "success", text: "Payment successful & booking confirmed!" });
      setTransaction(res.data);
      console.log("Payment + Booking response:", res.data);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Payment/Booking failed" });
    }
  };

  // NEW FLOW → Razorpay Checkout
  const handleRazorpayPayment = async () => {
    const loggedInUser = getUser();
    if (!loggedInUser) {
      setMessage({ type: "error", text: "You must be logged in to book a court." });
      return;
    }

    if (!selectedCourtInfo || !startTime || !endTime) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    try {
      // 1️⃣ Create order using request param
      const orderRes = await api.post(
        `/razorpay/create-order?amount=${selectedCourtInfo.price}`
      );

      const { id: orderId, amount, currency } = orderRes.data;

      // Debug: check key
      const key = import.meta.env.VITE_RAZORPAY_KEY;
      console.log("Loaded Razorpay key:", key);
      if (!key) {
        console.error("❌ Razorpay key is missing in env!");
        return;
      }

      // 2️⃣ Razorpay checkout options
      const options = {
        key: key,
        amount,
        currency,
        name: "ShuttleTime",
        description: "Court Booking Payment",
        order_id: orderId,
        handler: async (response) => {
          try {
            // 3️⃣ Verify payment + create booking in backend
            const verifyRes = await api.post("/razorpay/verify", {
              userId: loggedInUser.id,
              courtId: selectedCourtInfo.id,
              startTime,
              endTime,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            setMessage({ type: "success", text: "Booking confirmed via Razorpay!" });
            setTransaction({
              bookingId: verifyRes.data.bookingId || orderId,
              ...verifyRes.data,
            });
          } catch (err) {
            console.error("Payment verification failed:", err);
            setMessage({ type: "error", text: "Payment verification failed" });
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error creating order:", err);
      setMessage({ type: "error", text: "Payment initialization failed" });
    }
  };

  // Auto-set end time = +1 hr
  const handleStartTimeChange = (e) => {
    const newStart = e.target.value;
    setStartTime(newStart);

    const startDate = new Date(newStart);
    if (!isNaN(startDate)) {
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      const pad = (num) => String(num).padStart(2, "0");
      const formatted =
        `${endDate.getFullYear()}-${pad(endDate.getMonth() + 1)}-${pad(endDate.getDate())}T` +
        `${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`;
      setEndTime(formatted);
    }
  };

  // Show BookingSuccess after transaction
  if (transaction?.bookingId) {
    return <BookingSuccess bookingId={transaction.bookingId} transaction={transaction} />;
  }

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
            <p className="font-semibold">
              {selectedCourtInfo.venueName} - {selectedCourtInfo.courtName}
            </p>
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

        {/* End Time */}
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border rounded p-2 w-full"
        />

        {/* Old direct API submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Pay & Book (Direct API)
        </button>

        {/* Razorpay payment */}
        <button
          type="button"
          onClick={handleRazorpayPayment}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ml-3"
        >
          Pay with Razorpay
        </button>
      </form>
    </div>
  );
}

export default BookingPage;
