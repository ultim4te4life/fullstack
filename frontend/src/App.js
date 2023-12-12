import { Home, Product, Products, Login } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/signup/SignUp";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};
