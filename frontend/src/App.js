import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Product, Products, Login } from "./pages";
import SignUpPage from "./pages/signup/SignUp";
import { useUserContext } from "./context/UserContext";

export const App = () => {
  const { currentUser, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={currentUser ? <Products /> : <Navigate to="/login" />}
        />

        <Route
          path="/products/:id"
          element={currentUser ? <Product /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!currentUser ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/signup"
          element={!currentUser ? <SignUpPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};
