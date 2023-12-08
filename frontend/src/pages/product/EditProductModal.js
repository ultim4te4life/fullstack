import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  category: yup.string().required("Category is required"),
});

export const EditProductModal = ({ open, handleClose, product, id }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
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
      await validationSchema.validate(editedProduct, { abortEarly: false });
      console.log("Before axios request", editedProduct);
      await axios.put(`http://localhost:8080/products/${id}`, editedProduct);
      console.log("Product updated successfully!");
      handleClose();
      window.location.reload();
    } catch (error) {
      if (error.name === "ValidationError") {
        // Extract and set individual validation errors
        const newErrors = {};
        error.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error updating product:", error.message);
      }
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
            error={!!errors.name}
            helperText={errors.name}
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
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            label="Price"
            variant="outlined"
            margin="normal"
            fullWidth
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            label="Category"
            variant="outlined"
            margin="normal"
            fullWidth
            name="category"
            value={editedProduct.category}
            onChange={handleInputChange}
            error={!!errors.category}
            helperText={errors.category}
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
