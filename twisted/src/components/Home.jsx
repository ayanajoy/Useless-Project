import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [funnyMessage, setFunnyMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Go to form page
  const goToForm = () => navigate("/form");

  // Fake button click
  const fakeButtonClick = () => {
    let message = "";
    if (clickCount === 0) {
      message =
        "🤭 Oops wrong button! Mukalil ezhuthittu vayichille? Everything is twisted here... Poyi real button kand pidikkoo!";
    } else {
      message = "😌 Ith real allannu paranjathalle... poyi button kandu pidikkooo 😏";
    } 

    setFunnyMessage(message);
    setShowPopup(true);
    setClickCount((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1 className="title">
        {/* Secret real button */}
        <span className="spin-hover" onClick={goToForm} style={{ cursor: "pointer" }}>
          🌀
        </span>{" "}
        <span className="mirror">That Thalathirinja Website</span>
      </h1>

      <p className="subtitle mirror">
        Oh, you can read this? Welcome, fellow weirdo.
      </p>
      <p className="description mirror">
        Everything here is backward, upside down, and probably on fire.<br />
        Words are just suggestions. Logic is on vacation.<br />
        Click at your own risk—we're not responsible for any brain-related incidents.
      </p>

      {/* Fake button */}
      <button onClick={fakeButtonClick}>Step Into More Chaos</button>

      {/* Popup card */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <p>{funnyMessage}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
