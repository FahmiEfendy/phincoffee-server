const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const productRoute = require("./server/api/product");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productRoute);

app.get("/api", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Successfully connected to port ${port}`);
});
