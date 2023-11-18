const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json([
    { id: 1, name: "iphone" },
    { id: 2, name: "iwatch" },
    { id: 3, name: "macbook" },
  ]);
});

module.exports = router;
