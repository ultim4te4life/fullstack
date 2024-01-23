import React, { useState, useEffect } from "react";
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

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  category: Yup.string().required("Category is required"),
  visibility: Yup.string().required("Visibility is required"),
  imageUrl: Yup.string()
    .url("Invalid URL format")
    .required("Image URL is required"),
});

export const EditProductModal = ({ open, handleClose, product }) => {
  const { UPDATE_PRODUCT } = useProductContext();

  const [file, setFile] = useState();
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    visibility: product.visibility || "public",
    imageUrl: product.imageUrl,
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    visibility: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (product) {
      setEditedProduct({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        category: product.category || "",
        visibility: product.visibility || "public",
        imageUrl: product.imageUrl || "",
      });
    }
  }, [product]);

  const handleInputChange = (field, value) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEditProduct = async () => {
    try {
      const imageUrl = await uploadImage(file);
      await validationSchema.validate(editedProduct, { abortEarly: false });
      await UPDATE_PRODUCT({
        ...editedProduct,
        _id: product._id,
        imageUrl: imageUrl,
      });

      console.log("Product updated successfully!");
      handleClose();
    } catch (error) {
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
        console.error("Error updating product:", error.message);
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box>
        <Typography variant="h6">Edit Product</Typography>
        <form>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={editedProduct.name}
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
            value={editedProduct.description}
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
            value={editedProduct.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            label="Category"
            variant="outlined"
            margin="normal"
            fullWidth
            value={editedProduct.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            error={!!errors.category}
            helperText={errors.category}
          />
          <input type="file" onChange={handleImageChange} />
          <Select
            label="Visibility"
            variant="outlined"
            margin="normal"
            value={editedProduct.visibility}
            onChange={(e) => handleInputChange("visibility", e.target.value)}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>

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
