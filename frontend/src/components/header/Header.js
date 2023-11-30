// Header.js
import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header-container">
      <NavLink exact to="/" className="header-link" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/products" className="header-link" activeClassName="active">
        Products
      </NavLink>
    </div>
  );
};
