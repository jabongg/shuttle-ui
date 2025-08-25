import { Routes, Route, Link } from "react-router-dom";
import VenueList from "./pages/VenueList";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <div className="p-6">
      <nav className="flex gap-4 mb-6">
        <Link to="/venues" className="text-blue-600">Venues</Link>
        <Link to="/book" className="text-blue-600">Book Court</Link>
      </nav>

      <Routes>
        <Route path="/venues" element={<VenueList />} />
        <Route path="/book" element={<BookingPage />} />
      </Routes>
    </div>
  );
}

export default App;
