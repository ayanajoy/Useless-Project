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
        <span className="mirror">Thalathirinja Website</span>
      </h1>

      <p className="subtitle mirror">
        Oh, you can read this? You’re already one of us.
      </p>
      <p className="description mirror">
        Everything is twisted here... Like literally.<br />
        Words? Twisted. Logic? Gone.<br />
        Click things at your own risk – brain not guaranteed.
      </p>

      {/* Fake button */}
      <button onClick={fakeButtonClick}>Enter the Madness</button>

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
