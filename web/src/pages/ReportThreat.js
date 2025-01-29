import React, { useState, useRef } from "react";
import "../styles/ReportThreat.css";
import Navbar from "../components/Navbar";
import camera from "../assets/camera.png";
import AddLocation from "../components/AddLocation";

function ReportThreat() {
  const [image1, setImage1] = useState(null);
  const [slide, setSlide] = useState(1);
  const dialogRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage1(imageUrl);
      const img1 = document.getElementById("threat-img1-camera");
      img1.style.display = "none";
      const cover1 = document.getElementById("threat-img1-cover");
      cover1.style.display = "none";
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    dialogRef.current.close();
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <div id="threat-left-div">
          <p id="threat-left-title">Report Threat</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="threat-img1-input"
          />
          <p id="threat-img1-cover">‎</p>
          {image1 && <img src={image1} alt="Preview 1" id="threat-img1" />}
          <img src={camera} alt="Camera Icon" id="threat-img1-camera" />

          <p id="threat-slider-text">Severity</p>
          <input
            type="range"
            min="0"
            max="2"
            id="threat-slider"
            value={slide}
            onChange={(e) => setSlide(e.target.value)}
          />
          <p id="threat-slider-text1">Low</p>
          <p id="threat-slider-text2">Medium</p>
          <p id="threat-slider-text3">High</p>
        </div>
        <div id="threat-right-div">
          <form id="threat-form">
            <p id="threat-right-title">Threat Details</p>
            <hr />
            <h2 className="threat-right-titles">Title</h2>
            <input
              type="text"
              placeholder="Enter Title"
              id="threat-right-input1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h2 className="threat-right-titles">Description</h2>
            <textarea
              placeholder="Description"
              id="threat-right-input2"
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <h2 className="threat-right-titles">Location</h2>
            <div>
              {location ? (
                <div>
                  <p id="threat-selected-location">
                    Selected Location: {location.lat}, {location.lng}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dialogRef.current.showModal();
                    }}
                    id="threat-add-location"
                  >
                    Change Location
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dialogRef.current.showModal();
                  }}
                  id="threat-add-location"
                >
                  Add Location
                </button>
              )}
            </div>
            <button type="submit" id="threat-submit">
              Submit
            </button>
          </form>
        </div>
      </div>

      <dialog
        id="threat-location-dialog"
        ref={dialogRef}
        style={{
          width: "90%",
          maxWidth: "900px",
          height: "80vh",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "white",
        }}
      >
        <h1
          style={{
            fontFamily: "Lora",
            fontSize: "2rem",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Location
        </h1>
        <AddLocation
          onLocationSelect={handleLocationSelect}
          onClose={() => dialogRef.current.close()}
        />
        <button
          id="dialog-close"
          type="button"
          onClick={() => dialogRef.current.close()}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#dc3545",
            color: "white",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </dialog>
    </>
  );
}

export default ReportThreat;
