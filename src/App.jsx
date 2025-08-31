// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import VenueList from "./pages/VenueList";
import BookingPage from "./pages/BookingPage";
import AvailableSlots from "./pages/AvailableSlots";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { isLoggedIn } from "./utils/auth";

function App() {
  const loggedIn = isLoggedIn();

  return (
    <div>
      {/* ✅ Show Navbar only if user is logged in */}
      {loggedIn && <Navbar />}

      <div className={loggedIn ? "pt-20 px-6" : ""}>
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
            </>
          ) : (
            // If not logged in, redirect everything to login
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
