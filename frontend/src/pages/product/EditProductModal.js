// EditProductModal.js
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

export const EditProductModal = ({ open, handleClose, product, id }) => {
  console.log(product);
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
  });

  useEffect(() => {
    setEditedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
    });
  }, [product]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditProduct = async () => {
    try {
      console.log("Before axios request", editedProduct);
      await axios.put(`http://localhost:8080/products/${id}`, editedProduct);
      console.log("Product updated successfully!");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle, width: 400 }}>
        <h2>Edit Product</h2>
        <form>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            margin="normal"
            fullWidth
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
            multiline
            rows={4}
          />
          <TextField
            label="Price"
            variant="outlined"
            margin="normal"
            fullWidth
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
          />
          <TextField
            label="Category"
            variant="outlined"
            margin="normal"
            fullWidth
            name="category"
            value={editedProduct.category}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProduct}
            sx={{ marginTop: 2 }}
          >
            Save Changes
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "20px",
  backgroundColor: "white",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: "8px",
};
