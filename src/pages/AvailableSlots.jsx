import React, { useState, useEffect } from "react";
import axios from "axios";

const AvailableSlots = () => {
  const [venues, setVenues] = useState([]);
  const [venueId, setVenueId] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all venues on load
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get("http://localhost:8080/venues");
        setVenues(res.data);
      } catch (err) {
        console.error("Error fetching venues:", err);
        setError("Failed to load venues");
      }
    };
    fetchVenues();
  }, []);

  // Fetch slots for a venue & date
  const fetchSlots = async () => {
    if (!venueId || !date) {
      setError("Please select both Venue and Date.");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:8080/bookings/slots/venue/available",
        {
          params: { venueId, date },
        }
      );
      setSlots(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch available slots.");
    } finally {
      setLoading(false);
    }
  };

  // Book a slot
  const bookSlot = async (courtId, startTime) => {
    try {
      const res = await axios.post("http://localhost:8080/bookings", {
        courtId,
        startTime,
        date,
      });
      setSuccess(`✅ Slot booked successfully for ${startTime}`);
      fetchSlots(); // refresh available slots
    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to book slot. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Slots</h2>

      {/* Venue Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Select Venue:</label>
        <select
          value={venueId}
          onChange={(e) => setVenueId(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">-- Choose a Venue --</option>
          {venues.map((venue) => (
            <option key={venue.id} value={venue.id}>
              {venue.name} ({venue.location?.district}, {venue.location?.state})
            </option>
          ))}
        </select>
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Fetch Button */}
      <button
        onClick={fetchSlots}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check Available Slots
      </button>

      {/* Messages */}
      {loading && <p className="mt-4 text-blue-600">Loading slots...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {success && <p className="mt-4 text-green-600">{success}</p>}

      {/* Slots Display */}
      <div className="mt-6">
        {Object.keys(slots).length > 0 ? (
          Object.entries(slots).map(([court, { booked, available, courtId }]) => (
            <div key={court} className="mb-6 p-4 border rounded shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{court}</h3>

              {/* Available Slots */}
              <div className="mb-2">
                <h4 className="font-medium text-green-700 mb-1">Available:</h4>
                <div className="flex flex-wrap gap-2">
                  {available.length > 0 ? (
                    available.map((time, idx) => (
                      <button
                        key={idx}
                        onClick={() => bookSlot(courtId, time)}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200"
                      >
                        {time} (Book)
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500">No available slots</p>
                  )}
                </div>
              </div>

              {/* Booked Slots */}
              <div>
                <h4 className="font-medium text-red-700 mb-1">Booked:</h4>
                <div className="flex flex-wrap gap-2">
                  {booked.length > 0 ? (
                    booked.map((time, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                      >
                        {time}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No booked slots</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-gray-500">
              No slots found. Select a venue & date.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default AvailableSlots;
