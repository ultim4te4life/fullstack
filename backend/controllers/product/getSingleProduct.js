const Product = require("../../models/product");

const getSingleProduct = (req, res) => {
  res
    .status(200)
    .json({ message: `You are requesting product with id: ${req.params.id}` });
};

module.exports = { getSingleProduct };
