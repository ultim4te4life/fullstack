import React, { useState, useEffect } from "react";
import "./Products.css";
import { Header } from "../../components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:8080/products");
      const data = response.data;
      setProducts(data);
    };

    getProducts();
  }, []);

  console.log(products);

  return (
    <div>
      <Header />
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
    </div>
  );
};
