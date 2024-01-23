const express = require("express");
const auth = require("../middleware/auth");
const { changeProfile } = require("../controllers/accounts/changeProfile");

const router = express.Router();

router.use(auth);

router.put("/changeProfile", changeProfile);

module.exports = router;
