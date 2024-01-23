// Products.js
import React, { useEffect, useState } from "react";
import "./Products.css";

import { Header } from "../../components";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { CreateProductModal } from "./CreateProductModal";
import { useProductContext } from "../../context/ProductContext";
import { useTheme } from "../../context/ThemeContext";

export const Products = () => {
  const navigate = useNavigate();
  const { products, productsContextLoading } = useProductContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkTheme);
    document.body.classList.toggle("light", !isDarkTheme);
  }, [isDarkTheme]);

  if (productsContextLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={isDarkTheme ? "dark" : "light"}>
      <Header />
      <div className="products-header">
        <Button className="button" variant="outlined" onClick={handleOpen}>
          Create Product
        </Button>
      </div>
      <div className="products-container">
        {products &&
          products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={`Product: ${product.name}`}
                  className="product-image"
                />
              )}
              <h3 className="heading">Name: {product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p
                style={{
                  backgroundColor:
                    product.visibility === "public" ? "green" : "red",
                  padding: "2px 5px",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                Visibility: {product.visibility}
              </p>
              <p>Added By: {product.userEmail}</p>
            </div>
          ))}
      </div>
      <CreateProductModal open={open} handleClose={handleClose} />
    </div>
  );
};
