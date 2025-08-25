import { useEffect, useState } from "react";
import api from "../api/axios";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import image5 from "../images/image5.jpg";

// Temporary: map venueId (or name) to a background image
const venueImages = {
  1: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648", // badminton court
  2: "https://images.unsplash.com/photo-1517649763962-0c623066013b", // indoor stadium
  3: "https://images.unsplash.com/photo-1614102077882-bd03f87c5b29", // sports arena
  4: "https://images.unsplash.com/photo-1517649763962-0c623066013b", // hub
  5: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d", // indoor courts
};

function VenueList() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    api.get("/venues")
      .then(res => setVenues(res.data))
      .catch(err => console.error("Error fetching venues:", err));
  }, []);

  // Import images from the "images" folder

  // Map venue IDs to imported images
  const venueImages = {
    1: image1,
    2: image2,
    3: image3,
    4: image4,
    5: image5,
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Venues</h1>
      <ul className="space-y-6">
        {venues.map(v => (
          <li
            key={v.id}
            className="p-6 border rounded-lg shadow-lg text-white relative overflow-hidden"
            style={{
              backgroundImage: `url(${venueImages[v.id] || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10">
              <p className="text-2xl font-bold">{v.name}</p>
              <p className="text-sm">
                {v.location?.street}, {v.location?.district}, {v.location?.state} - {v.location?.pincode}
              </p>
              <p className="text-sm mb-2">📞 {v.contactNumber}</p>

              {/* Courts Section */}
              <div>
                <p className="font-medium">Courts:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  {v.courts && v.courts.length > 0 ? (
                    v.courts.map(court => (
                      <li key={court.id}>{court.courtName}</li>
                    ))
                  ) : (
                    <li>No courts available</li>
                  )}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VenueList;
