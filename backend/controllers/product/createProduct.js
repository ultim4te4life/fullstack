const Product = require("../../models/product");

const createnewProduct = async (req, res) => {
  const { name, price, description, category, visibility } = req.body;
  const userId = req.user._id;

  try {
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !userId ||
      visibility === undefined
    ) {
      return res.status(400).json({
        message: "All fields, including visibility, are required",
      });
    }

    if (visibility !== "public" && visibility !== "private") {
      return res.status(400).json({
        message: "Invalid visibility value. Use 'public' or 'private'.",
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      userId,
      visibility,
    });

    res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createnewProduct,
};
