import React from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

const Home = () => {
  const navigate = useNavigate();
  const goToForm = () => navigate("/form");

  return (
    <div className="container">
      <h1 className="title">
        🌀 <span className="mirror">Thalathirinja Website</span>
      </h1>
      <p className="subtitle mirror">
        Oh, you can read this? You’re already one of us.
      </p>
      <p className="description mirror">
        Everything is twisted here... Like literally.<br />
        Words? Twisted. Logic? Gone.<br />
        Click things at your own risk – brain not guaranteed.
      </p>
      <button onClick={goToForm}>Enter the Madness</button>
    </div>
  );
};

export default Home;
