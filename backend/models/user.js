const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
    trim: true,
  },
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
    minLength: 2,
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
    minLength: 2,
    trim: true,
  },
  age: { type: Number, required: [true, "Age is required"] },
});

module.exports = mongoose.model("User", userSchema);
