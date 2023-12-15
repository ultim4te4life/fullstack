// Header.js
import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import "./Header.css";

export const Header = () => {
  const { currentUser, signOut, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2196F3" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Your Logo
        </Typography>
        <NavLink to="/" className="header-link" activeClassName="active" exact>
          <Button color="inherit" sx={{ mx: 1 }}>
            Home
          </Button>
        </NavLink>
        <NavLink
          to="/products"
          className="header-link"
          activeClassName="active"
        >
          <Button color="inherit" sx={{ mx: 1 }}>
            Products
          </Button>
        </NavLink>
        {currentUser ? (
          <>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              Welcome,{" "}
              {currentUser.user ? currentUser.user.email : currentUser.email}
            </Typography>
            <Button color="inherit" onClick={signOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="header-link"
              activeClassName="active"
            >
              <Button color="inherit" sx={{ mx: 1 }}>
                Sign-In
              </Button>
            </NavLink>
            <NavLink
              to="/signup"
              className="header-link"
              activeClassName="active"
            >
              <Button color="inherit" sx={{ mx: 1 }}>
                Sign-up
              </Button>
            </NavLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
