// Product.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EditProductModal } from "./EditProductModal";
import { Header } from "../../components";
import "./Product.css";
import { DeleteProductModal } from "./DeleteProductModal";
import { useProductContext } from "../../context/ProductContext";
import { useTheme } from "../../context/ThemeContext";

export const Product = () => {
  const { id } = useParams();
  const { products, productsContextLoading } = useProductContext();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkTheme);
    document.body.classList.toggle("light", !isDarkTheme);
  }, [isDarkTheme]);

  const handleOpenEdit = async () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const product = products.find((product) => product._id === id);

  if (productsContextLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={isDarkTheme ? "dark" : "light"}>
      <Header />

      <div className="container">
        <div className="product-details">
          {/* Render product image here */}
          {product.imageUrl && (
            <img
              src={`${product.imageUrl}?${new Date().getTime()}`}
              alt={`Product: ${product.name}`}
              className="product-image-one"
            />
          )}
          <h2 className="heading">Product Details</h2>
          <p className="detail">Name: {product.name}</p>
          <p className="detail">Description: {product.description}</p>
          <p className="detail">Price: ${product.price}</p>
          <p className="detail">Category: {product.category}</p>
          <p
            style={{
              backgroundColor:
                product.visibility === "public" ? "green" : "red",
              padding: "2px 5px",
              borderRadius: "4px",
              color: "white",
            }}
            className="detail"
          >
            Visibility: {product.visibility}
          </p>
          <p className="detail">Added By: {product.userEmail}</p>{" "}
          {/* Add this line */}
          <button className="action-button" onClick={handleOpenEdit}>
            Edit Product
          </button>
          <button className="action-button" onClick={handleOpenDelete}>
            Delete Product
          </button>
        </div>
        <EditProductModal
          open={openEdit}
          handleClose={handleCloseEdit}
          product={product}
          id={id}
        />
        <DeleteProductModal
          open={openDelete}
          handleClose={handleCloseDelete}
          product={product}
          id={id}
        />
      </div>
    </div>
  );
};
