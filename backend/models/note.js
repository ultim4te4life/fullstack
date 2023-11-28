const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Note title is required"],
    },
    content: {
      type: String,
      required: [true, "Note content is required"],
    },
    category: {
      type: String,
      required: [true, "Note category is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
