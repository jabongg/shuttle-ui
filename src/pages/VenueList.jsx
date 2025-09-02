import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import api from "../api/axios";

import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import image5 from "../images/image5.jpg";

const venueImages = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
};

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // ✅ initialize navigate

  useEffect(() => {
    api
      .get("/venues")
      .then((res) => setVenues(res.data))
      .catch((err) => console.error("Error fetching venues:", err));
  }, []);

  const nextVenue = () => {
    setCurrentIndex((prev) => (prev + 1) % venues.length);
  };

  const prevVenue = () => {
    setCurrentIndex((prev) => (prev - 1 + venues.length) % venues.length);
  };

  if (venues.length === 0) return <p className="text-center mt-10">Loading venues...</p>;

  const v = venues[currentIndex];

  return (
    <div className="h-screen w-screen relative flex flex-col">
      {/* Venue display */}
      <section
        className="flex-1 flex items-center justify-center text-white relative transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${venueImages[v.id] || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-2xl text-center p-6">
          <h1 className="text-4xl font-bold mb-4">{v.name}</h1>
          <p className="text-lg mb-2">
            {v.location?.street}, {v.location?.district}, {v.location?.state} - {v.location?.pincode}
          </p>
          <p className="text-md mb-4">📞 {v.contactNumber}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {v.courts && v.courts.length > 0 ? (
            v.courts.map((court) => (
              <div
                key={court.id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
              >
                  <div>
                    <p className="text-sm text-gray-500 mb-2">{court.courtName}</p>
                    <p className="text-sm font-medium text-green-600">Price: ₹{court.price}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/bookings?courtId=${court.id}`)}
                    className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition duration-200"
                  >
                    Book
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No courts available</p>
            )}
          </div>

        </div>
      </section>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
        <button
          onClick={prevVenue}
          className="bg-white/30 hover:bg-white/50 p-3 rounded-full text-black font-bold"
        >
          ◀
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
        <button
          onClick={nextVenue}
          className="bg-white/30 hover:bg-white/50 p-3 rounded-full text-black font-bold"
        >
          ▶
        </button>
      </div>

      {/* Fixed Footer */}
      <footer className="bg-black/80 text-white p-4 text-center">
        &copy; 2025 My Venue Booking App
      </footer>
    </div>
  );
}

export default VenueList;
