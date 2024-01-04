// Header.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useUserContext } from "../../context/UserContext";

export const Header = () => {
  const { currentUser, signOut, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="header">
      <div className="logo">
        <img
          src="https://media1.giphy.com/media/IxKAzrKSGdOxGi4dlj/giphy.gif?cid=ecf05e479et91ishqeeiubgf5khgzfd8a3xcyivz6033d9dl&ep=v1_gifs_related&rid=giphy.gif&ct=g"
          alt="Your Logo"
        />
      </div>
      <nav className="nav">
        <NavLink to="/" className="nav-link" activeClassName="active" exact>
          Home
        </NavLink>
        <NavLink to="/products" className="nav-link" activeClassName="active">
          Products
        </NavLink>
        {currentUser ? (
          <div className="user-info">
            <span className="welcome-text">
              Welcome,{" "}
              {currentUser.user ? currentUser.user.email : currentUser.email}
            </span>
            <button className="sign-out-button" onClick={signOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <NavLink to="/login" className="nav-link" activeClassName="active">
              Sign-In
            </NavLink>
            <NavLink to="/signup" className="nav-link" activeClassName="active">
              Sign-up
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};
