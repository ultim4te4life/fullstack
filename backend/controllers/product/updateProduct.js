const Product = require("../../models/product");
const mongoose = require("mongoose");

const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ message: "product updated successfully" });
};

module.exports = { updateProduct };
