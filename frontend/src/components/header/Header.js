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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3eX-D-RNGANk5gT8Qw0iJ8M_6AGoIv_RjtQ&usqp=CAU"
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
