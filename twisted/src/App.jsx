import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReversedCursor from "./components/ReversedCursor.jsx";
import Home from "./components/Home.jsx";
import FormPage from "./components/FormPage.jsx"; // <-- Your form page component

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<ReversedCursor ><Home /> </ReversedCursor >} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </>
  );
}


export default App;
