import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import "./index.css";

import DetailCountry from "./pages/detailCountry";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/country/:name" element={<DetailCountry />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
