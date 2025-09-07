// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import VenueList from "./pages/VenueList";
import BookingPage from "./pages/BookingPage";
import AvailableSlots from "./pages/AvailableSlots";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { isLoggedIn } from "./utils/auth";
import Razorpay from "./pages/Razorpay";

function App() {
  const loggedIn = isLoggedIn();

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Show Navbar only if user is logged in */}
      {loggedIn && <Navbar />}

      {/* ✅ Main Content (pushes footer down) */}
      <main className={`flex-grow ${loggedIn ? "pt-20 px-6" : ""}`}>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          {loggedIn ? (
            <>
              <Route path="/venues" element={<VenueList />} />
              <Route path="/bookings" element={<BookingPage />} />
              <Route path="/available-slots" element={<AvailableSlots />} />
              <Route path="*" element={<Navigate to="/venues" />} />
              <Route path="/razorpay" element={<Razorpay />} />
            </>
          ) : (
            // If not logged in, redirect everything to login
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </main>

      {/* ✅ Footer always at bottom */}
      <Footer />
    </div>
  );
}

export default App;
