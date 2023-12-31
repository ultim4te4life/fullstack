const Product = require("../../models/product");

const getAllProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await Product.find({
      $or: [{ userId }, { visibility: "public" }],
    });

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllProduct };
