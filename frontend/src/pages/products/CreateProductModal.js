import React, { useState } from "react";
import { Modal } from "../../components";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import * as Yup from "yup";

export const CreateProductModal = (props) => {
  const { open, handleClose } = props;

  const [newProduct, setNewProduct] = useState({
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

  const handleCreateNewProduct = async () => {
    try {
      await validationSchema.validate(newProduct, { abortEarly: false });
      await axios.post("http://localhost:8080/products", newProduct);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      handleClose();
      window.location.reload();
    } catch (error) {
      if (error.name === "ValidationError") {
        console.error("Validation error:", error.errors);
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
    <div>
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
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              error={!!validationSchema.fields.name?.errors?.[0]}
              helperText={validationSchema.fields.name?.errors?.[0]}
            />
            <TextField
              label="Description"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              error={!!validationSchema.fields.description?.errors?.[0]}
              helperText={validationSchema.fields.description?.errors?.[0]}
            />
            <TextField
              label="Price"
              variant="outlined"
              margin="normal"
              fullWidth
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              error={!!validationSchema.fields.price?.errors?.[0]}
              helperText={validationSchema.fields.price?.errors?.[0]}
            />
            <TextField
              label="Category"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              error={!!validationSchema.fields.category?.errors?.[0]}
              helperText={validationSchema.fields.category?.errors?.[0]}
            />
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
    </div>
  );
};
