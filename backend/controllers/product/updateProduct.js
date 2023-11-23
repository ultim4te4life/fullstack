const Product = require("../../models/product");

const updateProduct = (req, res) => {
  res
    .status(200)
    .json({ message: `Updating product with id: ${req.params.id}` });
};

module.exports = { updateProduct };
