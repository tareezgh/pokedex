import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./pages/homepage/Home";
import Info from "./pages/infoPage/info";
import "./shared/components/style.css";

import { IPokemonInfo } from "./helpers/interface";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info:id" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
