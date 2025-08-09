import React, { useEffect, useState } from "react";

const ReversedCursor = () => {
  const [fakeCursor, setFakeCursor] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [lastMouse, setLastMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - lastMouse.x;
      const deltaY = e.clientY - lastMouse.y;

      setFakeCursor((prev) => {
        const newPos = {
          x: clamp(prev.x - deltaX, 0, window.innerWidth),
          y: clamp(prev.y - deltaY, 0, window.innerHeight),
        };

        // 🔹 Hover detection for fake cursor
        const el = document.elementFromPoint(newPos.x, newPos.y);
        document
          .querySelectorAll(".fake-hover")
          .forEach((btn) => btn.classList.remove("is-hovered"));
        if (el && el.classList.contains("fake-hover")) {
          el.classList.add("is-hovered");
        }

        return newPos;
      });

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
  }, [lastMouse, fakeCursor]);

  return (
    <div
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
  );
};

export default ReversedCursor;
