import { useState } from "react";

const App = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const getCoordinates = async () => {
    if (!address) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setCoordinates({ lat: data[0].lat, lon: data[0].lon });
      } else {
        alert("Address not found!");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4">Convert Address to Latitude & Longitude</h1>

      <input
        className="border p-2 w-full mb-2"
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded w-full"
        onClick={getCoordinates}
      >
        Get Coordinates
      </button>

      {coordinates && (
        <div className="mt-4">
          <h2 className="text-xl">Coordinates:</h2>
          <p>
            <strong>Latitude:</strong> {coordinates.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {coordinates.lon}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
