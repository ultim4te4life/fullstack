const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { reset } = require("nodemon");
const validator = require("validator");

const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send(`Invalid email or password`);
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).send(`please enter a valid email`);
    return;
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400).send(
      `please enter a at least one lowercase, one number, 
        one symbol, one uppercase, min 8 character length password`
    );
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send("User already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser._id);

    res.status(200).json({ newUser, token });
  } catch (err) {
    res.status(500).send(err.message);
    return;
  }
};

module.exports = { signUpUser };
