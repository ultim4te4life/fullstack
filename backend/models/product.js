const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    userId: {
      type: String,
      required: [true, "Product userId is required"],
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      required: [true, "Product visibility is required"],
    },
    userEmail: {
      type: String,
      required: [true, "User email is required"],
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
