import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const App = () => {
  const navigate = useNavigate();
  const [fakeCursor, setFakeCursor] = useState({ x: 0, y: 0 });

  const goToForm = () => {
    navigate("/form");
  };

  useEffect(() => {
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const handleMouseMove = (e) => {
      e.preventDefault();
      const invertedX = clamp(window.innerWidth - e.clientX, 0, window.innerWidth);
      const invertedY = clamp(window.innerHeight - e.clientY, 0, window.innerHeight);
      setFakeCursor({ x: invertedX, y: invertedY });

      // Fire a synthetic mousemove at the fake cursor position
      const el = document.elementFromPoint(invertedX, invertedY);
      if (el) {
        const moveEvent = new MouseEvent("mousemove", {
          bubbles: true,
          cancelable: true,
          clientX: invertedX,
          clientY: invertedY,
          view: window,
        });
        el.dispatchEvent(moveEvent);
      }
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
      window.scrollBy(0, e.deltaY * -1);
    };

    window.addEventListener("mousemove", handleMouseMove, true);
    window.addEventListener("click", handleClick, true);
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove, true);
      window.removeEventListener("click", handleClick, true);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [fakeCursor]);

  return (
    <div className="container">
      <div
        className="fake-cursor"
        style={{
          left: ${fakeCursor.x}px,
          top: ${fakeCursor.y}px,
        }}
      ></div>

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

export default App;