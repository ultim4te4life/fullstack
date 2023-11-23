const Product = require("../../models/product");

const deleteProduct = (req, res) => {
  res
    .status(200)
    .json({ message: `Deleting product with id: ${req.params.id}` });
};

module.exports = { deleteProduct };
