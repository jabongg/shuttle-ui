import { useEffect, useState } from "react";
import api from "../api/axios";

function VenueList() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    api.get("/venues")
      .then(res => setVenues(res.data))
      .catch(err => console.error("Error fetching venues:", err));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Venues</h1>
      <ul className="space-y-2">
        {venues.map(v => (
          <li key={v.id} className="p-3 border rounded shadow">
            <p className="font-semibold">{v.name}</p>
            <p className="text-sm text-gray-600">
              {v.location?.street}, {v.location?.district}, {v.location?.state}
            </p>
            <p className="text-sm">📞 {v.contactNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VenueList;
