import { useEffect, useState } from "react";
import api from "../api/axios";

// // Map venue IDs to Unsplash images (dynamic background)
// const venueImages = {
//   1: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648", // badminton court
//   2: "https://images.unsplash.com/photo-1517649763962-0c623066013b", // indoor stadium
//   3: "https://images.unsplash.com/photo-1614102077882-bd03f87c5b29", // sports arena
//   4: "https://images.unsplash.com/photo-1517649763962-0c623066013b", // hub
//   5: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d", // indoor courts
// };

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

  useEffect(() => {
    api
      .get("/venues")
      .then((res) => setVenues(res.data))
      .catch((err) => console.error("Error fetching venues:", err));
  }, []);

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
      {venues.map((v) => (
        <section
          key={v.id}
          className="snap-start flex items-center justify-center min-h-screen text-white relative"
          style={{
            backgroundImage: `url(${venueImages[v.id] || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Venue content */}
          <div className="relative z-10 max-w-2xl text-center p-6">
            <h1 className="text-4xl font-bold mb-4">{v.name}</h1>
            <p className="text-lg mb-2">
              {v.location?.street}, {v.location?.district}, {v.location?.state}{" "}
              - {v.location?.pincode}
            </p>
            <p className="text-md mb-4">📞 {v.contactNumber}</p>

            {/* Courts Section */}
            <div className="bg-black/70 rounded-lg p-4 inline-block">
              <p className="font-semibold mb-2">Courts:</p>
              <ul className="list-disc list-inside text-sm">
                {v.courts && v.courts.length > 0 ? (
                  v.courts.map((court) => (
                    <li key={court.id}>{court.courtName}</li>
                  ))
                ) : (
                  <li>No courts available</li>
                )}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default VenueList;
