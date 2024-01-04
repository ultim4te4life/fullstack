// Home.js
import React from "react";
import "./Home.css";
import { Header } from "../../components";

export const Home = () => {
  return (
    <div>
      {" "}
      <Header />
      <div className="home-container">
        <div className="main-content">
          <h1>Welcome to the Cybernetic Hub</h1>
          <p>Unleash the power of the future</p>
          <button className="explore-button">Explore Now</button>
        </div>
      </div>
    </div>
  );
};
