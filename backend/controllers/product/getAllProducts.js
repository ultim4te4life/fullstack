const Product = require("../../models/product");

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllProduct };
