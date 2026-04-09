import { useEffect, useState } from "react";
import { getPlaces } from "../services/api";

function Home({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const data = await getPlaces();
      setPlaces(data);
    };

    fetchPlaces();
  }, []);

  // ✅ handleClick OUTSIDE useEffect
  const handleClick = (place) => {
    onSelectPlace(place);
  };

  return (
    <div>
      <h1>Available Places</h1>

      {places.map((place) => (
        <div
          key={place._id}
          onClick={() => handleClick(place)}
          style={{
            border: "1px solid gray",
            padding: "15px",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          <h3>{place.name}</h3>
          <p>{place.location}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;