const User = require("../../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const changeProfile = async (req, res) => {
  const { email, newEmail, password, newPassword, firstname, lastname, age } =
    req.body;

  if (
    !email ||
    !newEmail ||
    !password ||
    !newPassword ||
    !firstname ||
    !lastname ||
    !age
  ) {
    return res.status(400).json({ error: "Provide all fields" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    if (!validator.isEmail(newEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({
        error:
          "Password is not strong enough! Please include at least 8 characters, including one uppercase, one lowercase, one number, and one special character.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user profile information
    user.email = newEmail;
    user.password = hashedPassword;
    user.firstname = firstname;
    user.lastname = lastname;
    user.age = age;

    // Save the updated user information to the database
    const updatedUser = await user.save();
    const token = createToken(updatedUser._id);

    res.json({
      token,
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        age: updatedUser.age,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { changeProfile };
