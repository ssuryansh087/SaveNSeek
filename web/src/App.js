import "./App.css";
import banner1 from "./assets/banner1.jpeg";
import banner2 from "./assets/banner2.jpg";
import fires from "./assets/firea.gif";
import brush from "./assets/brush.png";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <div id="landing-page-banner">
        <p id="landing-page-banner-title1">"Protect Nature,</p>
        <p id="landing-page-banner-title2">Protect Life"</p>
        <img
          src={banner1}
          alt="Landing Page Banner"
          id="landing-page-banner-image"
        />
        <p id="landing-page-banner-text">
          "Join us in safeguarding wildlife and their habitats. Every action
          counts in saving our precious ecosystems."
        </p>
        <Link to="/report-threat" id="landing-page-banner-button">
          Report a Threat
        </Link>
      </div>

      <p id="landing-page-quote">
        "Protecting nature today ensures a thriving world tomorrow. Every action
        counts." 🌿🐾
      </p>

      <div id="landing-page-banner2">
        <p id="landing-page-banner2-title1">"When Smoke Rises,</p>
        <p id="landing-page-banner2-title2">Wildlife Faces Peril"</p>
        <img
          src={banner2}
          alt="Landing Page Banner 2"
          id="landing-page-banner-image2"
        />
        <div id="banner2-leftdiv">
          <p
            id="landing-page-banner-text2"
            style={{
              fontSize: "3rem",
              textAlign: "center",
              width: "90%",
              top: "2%",
              color: "black",
            }}
          >
            Be the Voice for the Voiceless
          </p>
          <p id="landing-page-banner-text2" style={{ top: "15%" }}>
            "Wildfires threaten entire ecosystems, displacing wildlife and
            destroying habitats. Your quick report can make a difference in
            saving lives."
          </p>

          <img src={brush} alt="Brush Strokes" id="banner-brush-main" />

          <img src={brush} alt="Brush Strokes" id="banner-brush" />
          <p id="banner-brush-text1">
            "Over 10 million hectares of forest are lost to wildfires every
            year."
          </p>

          <img src={brush} alt="Brush Strokes" id="banner-brush2" />
          <p id="banner-brush-text2">
            "70% of wildfires are detected too late for effective action."
          </p>

          <a href="/" id="landing-page-banner-button2">
            Report Smoke
          </a>
        </div>
      </div>
      <img src={fires} alt="Fires Statistics" id="landing-page-fires" />
    </>
  );
}

export default App;
