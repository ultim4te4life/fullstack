const express = require("express");
const { signInUser, signUpUser } = require("../controllers/user");
const router = express.Router();

router.post("/signin", signInUser);

router.post("/signup", signUpUser);

module.exports = router;
