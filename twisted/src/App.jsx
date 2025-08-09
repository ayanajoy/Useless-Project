import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReversedCursor from "./components/ReversedCursor.jsx";
import Home from "./components/Home.jsx";
import FormPage from "./components/FormPage.jsx";

function App() {
  const location = useLocation();
  const shouldShowCursor = location.pathname === "/";

  return (
    <>
      {shouldShowCursor && <ReversedCursor />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </>
  );
}

export default App;
