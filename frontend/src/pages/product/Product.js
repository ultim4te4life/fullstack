// Product.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { EditProductModal } from "./EditProductModal";
import { Header } from "../../components";
import "./Product.css"; // Import the external CSS file
import { DeleteProductModal } from "./DeleteProductModal";

export const Product = () => {
  const [product, setProduct] = useState({});
  // state for edit modal
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  // state for delete modal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${id}`
        );
        const data = response.data;
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      <Header />

      <div className="container">
        <div className="product-details">
          <h2 className="heading">Product Details</h2>
          <p className="detail">Name: {product.name}</p>
          <p className="detail">Description: {product.description}</p>
          <p className="detail">Price: ${product.price}</p>
          <p className="detail">Category: {product.category}</p>
          <button
            style={{
              padding: "10px",
              backgroundColor: "purple",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            variant="outlined"
            onClick={handleOpenEdit}
          >
            Edit product
          </button>

          <button
            style={{
              padding: "10px",
              backgroundColor: "purple",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            variant="outlined"
            onClick={handleOpenDelete}
          >
            Delete product
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
