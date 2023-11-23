const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const {
  createnewProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

// GET /products - Get all products
router.get("/", getAllProduct);

// GET /products/:id - Get a single product by ID
router.get("/:id", getSingleProduct);

// POST /products - Create a new product
router.post("/", createnewProduct);
// PUT /products/:id - Update a product by ID
router.put("/:id", updateProduct);

// DELETE /products/:id - Delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;
