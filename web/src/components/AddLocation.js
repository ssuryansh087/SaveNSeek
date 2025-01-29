import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Set up default icon for markers
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// MapUpdater component for handling map center updates
const MapUpdater = ({ initialLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (initialLocation) {
      map.setView([initialLocation.latitude, initialLocation.longitude], 13);
      // Add invalidateSize to force map redraw
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [initialLocation, map]);

  return null;
};

const AddLocation = ({ onLocationSelect, onClose }) => {
  const [initialLocation, setInitialLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Function to search for locations
  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching location:", error);
      alert("Error searching for location. Please try again.");
    }
    setSearching(false);
  };

  // Function to handle search result selection
  const selectSearchResult = (result) => {
    const newLocation = {
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
    };

    const newSelectedLocation = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    };

    setInitialLocation(newLocation);
    setSelectedLocation(newSelectedLocation);
    setSearchResults([]);
    setSearchQuery("");
  };

  // Function to get user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setInitialLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Could not get location. Using default location.");
          // Set default location (e.g., city center)
          setInitialLocation({ latitude: 51.505, longitude: -0.09 }); // London coordinates
        }
      );
    } else {
      alert(
        "Geolocation is not supported by this browser. Using default location."
      );
      setInitialLocation({ latitude: 51.505, longitude: -0.09 }); // London coordinates
    }
  };

  // Component to handle map clicks and marker placement
  const LocationSelector = () => {
    useMapEvents({
      click(e) {
        const clickedLocation = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };
        setSelectedLocation(clickedLocation);
      },
    });

    return selectedLocation ? (
      <Marker position={selectedLocation}>
        <Popup>Selected Location</Popup>
      </Marker>
    ) : null;
  };

  // Function to handle location confirmation
  const handleConfirm = () => {
    if (!selectedLocation) {
      alert("Please select a location on the map.");
      return;
    }

    onLocationSelect(selectedLocation);
    if (onClose) {
      onClose();
    }
  };

  // Effect to handle map resize
  useEffect(() => {
    const map = document.querySelector(".leaflet-container");
    if (map) {
      const resizeObserver = new ResizeObserver(() => {
        window.dispatchEvent(new Event("resize"));
      });
      resizeObserver.observe(map);
      return () => resizeObserver.disconnect();
    }
  }, []);

  // Effect to get initial location
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div
      className="add-location-container"
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* Search container */}
      <div
        className="search-container"
        style={{
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location..."
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={searchLocation}
            disabled={searching || !searchQuery.trim()}
            style={{
              padding: "8px 16px",
              backgroundColor:
                searching || !searchQuery.trim() ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor:
                searching || !searchQuery.trim() ? "not-allowed" : "pointer",
            }}
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </div>

        {searchResults.length > 0 && (
          <div
            className="search-results"
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
            }}
          >
            {searchResults.map((result, index) => (
              <div
                key={index}
                onClick={() => selectSearchResult(result)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                {result.display_name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map container */}
      <div
        className="map-container"
        style={{
          height: "400px",
          width: "100%",
          position: "relative",
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {initialLocation ? (
          <MapContainer
            center={[initialLocation.latitude, initialLocation.longitude]}
            zoom={13}
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            whenCreated={(map) => {
              setTimeout(() => {
                map.invalidateSize();
              }, 100);
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[initialLocation.latitude, initialLocation.longitude]}
            >
              <Popup>Your Location</Popup>
            </Marker>
            <LocationSelector />
            <MapUpdater initialLocation={initialLocation} />
          </MapContainer>
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f8f9fa",
            }}
          >
            <p>Loading map...</p>
          </div>
        )}
      </div>

      {/* Confirm button */}
      <button
        onClick={handleConfirm}
        disabled={!selectedLocation}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          width: "100%",
          backgroundColor: selectedLocation ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: selectedLocation ? "pointer" : "not-allowed",
        }}
      >
        Confirm Location
      </button>
    </div>
  );
};

export default AddLocation;
