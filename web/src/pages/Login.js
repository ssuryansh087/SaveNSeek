import React, { useState, useRef } from "react";
import "../styles/Login.css";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import NGO from "../assets/NGO.png";
import USER from "../assets/USER.png";

function Login() {
  let [buttonText, setButtonText] = useState("Show");
  const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState(1);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const divRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const [text1, setText1] = useState(
    "Create a SaveNSeek Account to Protect Wildlife and Nature:"
  );
  const [p1, setP1] = useState(
    "-Report Wildlife Threats and Fire Incidents in Real-Time"
  );
  const [p2, setP2] = useState(
    "-Join Conservation Events and Awareness Drives"
  );
  const [p3, setP3] = useState(
    "-Volunteer for Wildlife Protection Initiatives"
  );
  const [p4, setP4] = useState("-Receive Updates on Wildlife Safety");

  const HandleClick = () => {
    setButtonText(showPassword === true ? "Show" : "Hide");
    setShowPassword((prev) => !prev);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = (val) => {
    if (val === 1) {
      if (selected !== 1) {
        setSelected(1);
        input1Ref.current.style.backgroundColor = "#67A274";
        input2Ref.current.style.backgroundColor = "#67A274";
        divRef.current.style.backgroundColor = "#67A274";
        btn1Ref.current.style.backgroundColor = "#67A274";
        btn1Ref.current.style.color = "#171717";
        btn2Ref.current.style.backgroundColor = "#f8fbef";
        btn2Ref.current.style.color = "#171717";
        setText1("Create a SaveNSeek Account to Protect Wildlife and Nature:");
        setP1("-Report Wildlife Threats and Fire Incidents in Real-Time");
        setP2("-Join Conservation Events and Awareness Drives");
        setP3("-Volunteer for Wildlife Protection Initiatives");
        setP4("-Receive Updates on Wildlife Safety");
        const img1 = document.getElementById("USERTake1");
        const img2 = document.getElementById("NGOTake1");
        img1.style.display = "none";
        img2.style.display = "block";
      }
    } else if (val === 2) {
      if (selected !== 2) {
        setSelected(2);
        input1Ref.current.style.backgroundColor = "#DDDDF8";
        input2Ref.current.style.backgroundColor = "#DDDDF8";
        divRef.current.style.backgroundColor = "#DDDDF8";
        btn1Ref.current.style.backgroundColor = "#f8fbef";
        btn1Ref.current.style.color = "#2d2d34";
        btn2Ref.current.style.backgroundColor = "#DDDDF8";
        btn2Ref.current.style.color = "#171717";
        setText1(
          "Create a SaveNSeek Account to Amplify Your Conservation Efforts"
        );
        setP1("-Organize and Promote Wildlife Conservation Events");
        setP2("-Recruit Volunteers for Wildlife Protection Initiatives");
        setP3("-Receive and Manage Donations Effectively");
        setP4("-Share Real-Time Updates");
        const img1 = document.getElementById("USERTake1");
        const img2 = document.getElementById("NGOTake1");
        img1.style.display = "block";
        img2.style.display = "none";
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div id="SignInDiv">
      <Navbar />
      <div>
        <div>
          <div className="leftContainer">
            <img src={NGO} id="NGOTake1" alt="NGO Take 1" />
            <img src={USER} id="USERTake1" alt="USER Take 1" />

            <div id="LoginSwitcher">
              <button ref={btn1Ref} id="SwitchF" onClick={() => handleClick(1)}>
                User
              </button>
              <button ref={btn2Ref} id="SwitchE" onClick={() => handleClick(2)}>
                NGO
              </button>
            </div>

            <h1 id="loginText">Login to Your Account</h1>

            <form onSubmit={handleLogin}>
              <div id="usernameID">
                <input
                  ref={input1Ref}
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="username"
                  required
                  id="usernameInput"
                />
              </div>

              <div id="passwordID">
                <input
                  ref={input2Ref}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength="16"
                  placeholder="Password"
                  name="password"
                  required
                  id="passwordInput"
                />
                <button
                  type="button"
                  className="toggleButton"
                  onClick={HandleClick}
                >
                  {buttonText}
                </button>
              </div>

              <button type="submit" id="submitButton">
                Sign In
              </button>
            </form>
          </div>

          <div className="rightContainer" ref={divRef}>
            <img src={logo} id="LoginLogo" alt="Logo" />
            <h1 id="newHere">New Here?</h1>
            <p id="SignUpText">{text1}</p>
            <p className="offers">{p1}</p>
            <p className="offers">{p2}</p>
            <p className="offers">{p3}</p>
            <p className="offers">{p4}</p>
            <Link to="/signup">
              <button type="submit" id="signUpButton">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
