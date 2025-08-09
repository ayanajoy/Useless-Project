import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css"; // adjust if your CSS path changes

const Home = () => {
  const navigate = useNavigate();
  const [fakeCursor, setFakeCursor] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [lastMouse, setLastMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const goToForm = () => {
    navigate("/form");
  };

  useEffect(() => {
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - lastMouse.x;
      const deltaY = e.clientY - lastMouse.y;

      // Opposite direction movement
      setFakeCursor((prev) => ({
        x: clamp(prev.x - deltaX, 0, window.innerWidth),
        y: clamp(prev.y - deltaY, 0, window.innerHeight),
      }));

      setLastMouse({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e) => {
      e.preventDefault();
      const el = document.elementFromPoint(fakeCursor.x, fakeCursor.y);
      if (el) {
        ["mousedown", "mouseup", "click"].forEach((type) => {
          const event = new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            clientX: fakeCursor.x,
            clientY: fakeCursor.y,
            view: window,
          });
          el.dispatchEvent(event);
        });
      }
    };

    const handleScroll = (e) => {
      e.preventDefault();
      window.scrollBy(0, e.deltaY * -1); // Reverse scroll
    };

    window.addEventListener("mousemove", handleMouseMove, true);
    window.addEventListener("click", handleClick, true);
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove, true);
      window.removeEventListener("click", handleClick, true);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [fakeCursor, lastMouse]);

  return (
    <div className="container">
      {/* Fake Cursor */}
      <div
        className="fake-cursor"
        style={{
          left: fakeCursor.x,
          top: fakeCursor.y,
          position: "absolute",
          pointerEvents: "none",
          width: "20px",
          height: "20px",
          background: "red",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      ></div>

      {/* Page Content */}
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
