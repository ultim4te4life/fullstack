// Products.js
import React, { useState, useEffect } from "react";
import "./Products.css";
import { Header } from "../../components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CreateProductModal } from "./CreateProductModal";

export const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:8080/products");
      const data = await response.data;
      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <div>
      <Header />
      <button variant="outlined" onClick={handleOpen}>
        Create Product
      </button>
      <div className="products-container">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <h3>Name: {product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
      <CreateProductModal open={open} handleClose={handleClose} />
    </div>
  );
};
