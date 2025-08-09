import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FormPage from "./components/FormPage"; // You can create this

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  );
};

export default App;
