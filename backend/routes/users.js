const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const userData = [
  { id: 1, name: "John" },
  { id: 2, name: "Bek" },
  { id: 3, name: "Temka" },
];

router.get("/", (req, res) => {
  res.status(200).json(userData);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = userData.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const user = userData.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = name;
  res.json(user);
});

router.post("/", (req, res) => {
  const name = req.body.name;

  const newUser = {
    id: uuidv4(),
    name: name,
  };

  userData.push(newUser);

  res.status(201).json(userData);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const user = userData.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const index = userData.indexOf(user);
  userData.splice(index, 1);

  res.status(201).json(userData);
});

module.exports = router;
