import { Routes, Route } from "react-router-dom";
import VenueList from "./pages/VenueList";
import BookingPage from "./pages/BookingPage";
import AvailableSlots from "./pages/AvailableSlots";
import Navbar from "./components/Navbar"; // ✅ Import your Navbar

function App() {
  return (
    <div>
      {/* Navbar stays fixed at the top */}
      <Navbar />

      {/* Page content */}
      <div className="pt-20 px-6">
        <Routes>
          <Route path="/venues" element={<VenueList />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/available-slots" element={<AvailableSlots />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
