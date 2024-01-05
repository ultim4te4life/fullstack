// Products.js
import React, { useState } from "react";
import "./Products.css";

import { Header } from "../../components";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { CreateProductModal } from "./CreateProductModal";
import { useProductContext } from "../../context/ProductContext";

export const Products = () => {
  const navigate = useNavigate();
  const { products, productsContextLoading } = useProductContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (productsContextLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="products-header">
        <Button
          className="button-styled"
          variant="outlined"
          onClick={handleOpen}
        >
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
              <h3>Name: {product.name}</h3>
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
              <p>Added By: {product.userEmail}</p> {/* Add this line */}
            </div>
          ))}
      </div>
      <CreateProductModal open={open} handleClose={handleClose} />
    </div>
  );
};
