import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar.js";
import NGO from "../assets/NGO.png";
import USER from "../assets/USER.png";

function SignUp() {
  let [buttonText, setButtonText] = useState("Show");
  const [password, setPassword] = useState("");
  const [place, setPlace] = useState("Name");
  const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState(1);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const divRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const [p1, setP1] = useState(
    "-Report and Track Wildlife Threats in Real-Time"
  );
  const [p2, setP2] = useState(
    "-Join Conservation Efforts and Volunteer for Nature"
  );
  const navigate = useNavigate();

  const HandleClick = () => {
    setButtonText(showPassword === true ? "Show" : "Hide");
    setShowPassword((prev) => !prev);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = (val) => {
    if (val === 1) {
      if (selected !== 1) {
        setSelected(1);
        input1Ref.current.style.backgroundColor = "#77cbb9";
        input2Ref.current.style.backgroundColor = "#77cbb9";
        input3Ref.current.style.backgroundColor = "#77cbb9";
        divRef.current.style.backgroundColor = "#77cbb9";
        btn1Ref.current.style.backgroundColor = "#77cbb9";
        btn1Ref.current.style.color = "#171717";
        btn2Ref.current.style.backgroundColor = "#f8fbef";
        btn2Ref.current.style.color = "#171717";
        setP1("-Report and Track Wildlife Threats in Real-Time");
        setP2("-Join Conservation Efforts and Volunteer for Nature");
        setPlace("Name");
        const img1 = document.getElementById("USERTake2");
        const img2 = document.getElementById("NGOTake2");
        img1.style.display = "none";
        img2.style.display = "block";
      }
    } else if (val === 2) {
      if (selected !== 2) {
        setSelected(2);
        input1Ref.current.style.backgroundColor = "#DDDDF8";
        input2Ref.current.style.backgroundColor = "#DDDDF8";
        input3Ref.current.style.backgroundColor = "#DDDDF8";
        divRef.current.style.backgroundColor = "#DDDDF8";
        btn1Ref.current.style.backgroundColor = "#f8fbef";
        btn1Ref.current.style.color = "#2d2d34";
        btn2Ref.current.style.backgroundColor = "#DDDDF8";
        btn2Ref.current.style.color = "#171717";
        setP1("-Manage Real-Time Threats and Projects Effectively");
        setP2("-Connect with Volunteers and Donors");
        setPlace("Organization Name");
        const img1 = document.getElementById("USERTake2");
        const img2 = document.getElementById("NGOTake2");
        img1.style.display = "block";
        img2.style.display = "none";
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div id="SignUpDiv">
      <Navbar />
      <div>
        <div className="leftContainer2" ref={divRef}>
          <img src={logo} id="Logo2" alt="Logo" />
          <h1 id="newHere2">Already a Member?</h1>
          <p id="SignUpText2">Sign In to SaveNSeek!</p>
          <p className="offers2">{p1}</p>
          <p className="offers2">{p2}</p>
          <p className="offers2">& Much More!</p>
          <Link to="/login">
            <button type="submit" id="signUpButton2">
              Sign In
            </button>
          </Link>
        </div>

        <div className="rightContainer2">
          <img src={NGO} id="NGOTake2" alt="NGO Take 12" />
          <img src={USER} id="USERTake2" alt="USER Take 2" />

          <div id="LoginSwitcher2">
            <button ref={btn1Ref} id="SwitchF" onClick={() => handleClick(1)}>
              User
            </button>
            <button ref={btn2Ref} id="SwitchE" onClick={() => handleClick(2)}>
              NGO
            </button>
          </div>

          <h1 id="loginText2">Create Account</h1>

          <form onSubmit={handleRegister}>
            <div id="nameID2">
              <input
                ref={input1Ref}
                type="text"
                placeholder={place}
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required
                id="nameInput2"
              />
            </div>

            <div id="usernameID2">
              <input
                ref={input2Ref}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="username"
                required
                id="usernameInput2"
              />
            </div>

            <div id="passwordID">
              <input
                ref={input3Ref}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                required
                id="passwordInput2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggleButton"
                onClick={HandleClick}
              >
                {buttonText}
              </button>
            </div>

            <button type="submit" id="submitButton2">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
