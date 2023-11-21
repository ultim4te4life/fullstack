const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Example data (replace with MongoDB operations)
const products = [
  { id: 1, name: "iphone" },
  { id: 2, name: "iwatch" },
  { id: 3, name: "macbook" },
];

// GET /products - Get all products
router.get("/", (req, res) => {
  res.status(200).json({ message: "Getting all products" });
});

// GET /products/:id - Get a single product by ID
router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ message: `You are requesting product with id: ${req.params.id}` });
});

// POST /products - Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !description || !category) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    } else {
      const product = await Product.create({
        name,
        price,
        description,
        category,
      });
      res.status(201).json({ product });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// PUT /products/:id - Update a product by ID
router.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ message: `Updating product with id: ${req.params.id}` });
});

// DELETE /products/:id - Delete a product by ID
router.delete("/:id", (req, res) => {
  res
    .status(200)
    .json({ message: `Deleting product with id: ${req.params.id}` });
});

module.exports = router;
