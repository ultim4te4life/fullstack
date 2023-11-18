const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");

const port = process.env.PORT || 3000;
// middleware ---> logging

app.use((req, res, next) => {
  console.log(
    `This user has requested from ${req.path} using this ${req.method} method`
  );
  next();
});

///this is get request

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/users", usersRoutes);

app.use("/products", productsRoutes);

app.use((req, res, next) => {
  res.json({ message: `page not found` });
  next();
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
