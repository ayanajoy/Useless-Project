import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReversedCursor from "./components/ReversedCursor.jsx";
import Home from "./components/Home.jsx";
import FormPage from "./components/FormPage.jsx";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (isHomePage) {
      document.body.classList.add("hide-real-cursor");
    } else {
      document.body.classList.remove("hide-real-cursor");
    }
  }, [isHomePage]);

  return (
    <>
      {isHomePage && <ReversedCursor />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </>
  );
}

export default App;
