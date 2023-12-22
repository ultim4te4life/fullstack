const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "No authorization" });
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    req.user = await User.findById(id);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorized" });
  }
};
module.exports = auth;
