const Product = require("../../models/product");
const createnewProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  try {
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    } else {
      const product = await Product.create({
        name,
        price,
        description,
        category,
      });
      res.status(201).json({ product });
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
