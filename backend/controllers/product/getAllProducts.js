const Product = require("../../models/product");

const getAllProduct = (req, res) => {
  res.status(200).json({ message: "Getting all products" });
};
module.exports = { getAllProduct };
