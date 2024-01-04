// Product.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EditProductModal } from "./EditProductModal";
import { Header } from "../../components";
import "./Product.css";
import { DeleteProductModal } from "./DeleteProductModal";
import { useProductContext } from "../../context/ProductContext";

export const Product = () => {
  const { id } = useParams();
  const { products, productsContextLoading, fetchProducts } =
    useProductContext();
  const [product, setProduct] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    if (!productsContextLoading && products.length === 0) {
      fetchProducts();
    } else {
      const foundProduct = products.find((p) => p._id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id, products, productsContextLoading, fetchProducts]);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  if (productsContextLoading) {
    return <div>Loading...</div>;
  }

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
          <p className="detail">Visibility: {product.visibility}</p>
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
