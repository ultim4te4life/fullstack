const Product = require("../../models/product");
const createnewProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  const userId = req.user._id;
  try {
    if (!name || !price || !description || !category || !userId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    } else {
      const product = await Product.create({
        name,
        price,
        description,
        category,
        userId,
      });
      res.status(201).json(product);
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  createnewProduct,
};
