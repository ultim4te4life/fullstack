import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router";

export const DeleteProductModal = ({ open, handleClose, id }) => {
  const navigate = useNavigate();
  console.log(id);
  const handleDeleteProduct = async () => {
    try {
      // Make an HTTP DELETE request to your server endpoint
      await axios.delete(`http://localhost:8080/products/${id}`);
      console.log("Product deleted successfully!");

      handleClose();
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <h2>Delete Product</h2>
        <p>Are you sure you want to delete this product?</p>
        <Button
          variant="contained"
          onClick={handleDeleteProduct}
          sx={{ marginBottom: 3 }}
        >
          Delete
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
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
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
