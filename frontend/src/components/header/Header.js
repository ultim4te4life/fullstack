import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import { useTheme } from "../../context/ThemeContext";

export const Header = () => {
  const { currentUser, signOut, userContextLoading } = useUserContext();
  const { setProducts } = useProductContext();
  const { isDarkTheme, toggleTheme } = useTheme();

  const handleLogout = () => {
    signOut();
    setProducts([]);
  };

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  return (
    <header className={`header ${isDarkTheme ? "dark" : "light"}`}>
      <div className="logo">
        <img alt="Your Logo" />
      </div>
      <div className="theme-toggle">
        <label className="switch">
          <input type="checkbox" onChange={toggleTheme} checked={isDarkTheme} />
          <span className="slider round"></span>
        </label>
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
            {/* Wrap the email with NavLink */}
            <NavLink to="/profile" className="user-email-link">
              <span className="welcome-text">
                Welcome,{" "}
                {currentUser.user ? currentUser.user.email : currentUser.email}
              </span>
            </NavLink>
            <button className="sign-out-button" onClick={handleLogout}>
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
