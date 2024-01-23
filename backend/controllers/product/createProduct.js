const Product = require("../../models/product");
const User = require("../../models/user");

const createnewProduct = async (req, res) => {
  const { name, price, description, category, visibility, imageUrl } = req.body;
  const userId = req.user._id;
  const userEmail = req.user.email;

  try {
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !userId ||
      !visibility ||
      !imageUrl ||
      !userEmail
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

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      userId,
      visibility,
      userEmail,
      imageUrl,
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
