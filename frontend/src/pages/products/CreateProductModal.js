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
import { uploadImage } from "../../utils";

export const CreateProductModal = ({ open, handleClose }) => {
  const { CREATE_PRODUCT } = useProductContext();
  const [file, setFile] = useState();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    visibility: "public",
    imageUrl: "",
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

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCreateNewProduct = async () => {
    try {
      await validationSchema.validate(newProduct, { abortEarly: false });

      const imageUrl = await uploadImage(file);
      console.log(imageUrl);
      const updatedProduct = {
        ...newProduct,
        imageUrl: imageUrl,
        price: parseInt(newProduct.price),
      };
      await CREATE_PRODUCT(updatedProduct);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        visibility: "public",
        imageUrl: "",
      });
      setFile();
      handleClose();
    } catch (error) {
      console.error(error);
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((validationError) => {
          const path = validationError.path || "unknown";
          newErrors[path] = validationError.message;
        });
        setErrors(newErrors);
      } else if (error.name === "AbortError") {
        console.error("Image upload aborted:", error.message);
      } else {
        console.error("Error creating product:", error.message);
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
          <input type="file" onChange={handleImageChange} />
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
