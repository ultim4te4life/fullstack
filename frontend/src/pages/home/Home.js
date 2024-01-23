import React from "react";
import "./Home.css";
import { Header } from "../../components";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { Footer } from "../../components/footer/Footer";

export const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useUserContext();

  const handleExploreNow = () => {
    currentUser ? navigate("/products") : navigate("/login");
  };

  return (
    <div>
      {" "}
      <Header />
      <div className="home-container">
        <div className="main-content">
          <h1>Welcome to the Cybernetic Hub</h1>
          <p>Unleash the power of the future</p>
          <button className="explore-button" onClick={handleExploreNow}>
            {currentUser ? "Add your products" : "Get Started"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
