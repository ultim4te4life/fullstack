import React, { useState } from "react";
import { Modal } from "../../components";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";
import { useProductContext } from "../../context/ProductContext";

export const CreateProductModal = ({ open, handleClose }) => {
  const { CREATE_PRODUCT } = useProductContext();

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    visibility: "public", // Set a default visibility value
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    category: Yup.string().required("Category is required"),
  });

  const handleInputChange = (field, value) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  const handleCreateNewProduct = async () => {
    try {
      await validationSchema.validate(newProduct, { abortEarly: false });
      await CREATE_PRODUCT(newProduct);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        visibility: "public",
      });
      handleClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error creating product:", error);
      }
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <Box>
        <Typography variant="h6">Create a New Product</Typography>
        <form style={formStyle}>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={newProduct.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Description"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
            value={newProduct.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            label="Price"
            variant="outlined"
            margin="normal"
            fullWidth
            type="number"
            value={newProduct.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            label="Category"
            variant="outlined"
            margin="normal"
            fullWidth
            value={newProduct.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            error={!!errors.category}
            helperText={errors.category}
          />
          <Select
            label="Visibility"
            variant="outlined"
            margin="normal"
            value={newProduct.visibility}
            onChange={(e) => handleInputChange("visibility", e.target.value)}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNewProduct}
            sx={{ marginTop: 2 }}
          >
            Create Product
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ marginTop: 2 }}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
