import React from "react";
import "./Home.css";
import { Header } from "../../components";

export const Home = () => {
  return (
    <div className="home-container">
      <Header />

      <div className="main-content">
        <h1>Welcome to Your Website</h1>
        <p>Explore the world of possibilities</p>
        <button className="explore-button">Explore Now</button>
      </div>
    </div>
  );
};
