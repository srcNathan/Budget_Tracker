import React from "react";
import HomePage from "./components/HomePage";
import BackgroundCanvas from "./components/BackgroundCanvas";
import "./index.css";

export default function App() {
  return (
    <>
      <BackgroundCanvas />
      <HomePage />
    </>
  );
}
