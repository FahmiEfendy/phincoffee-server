const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

const category = require("./server/api/category");
const productRoute = require("./server/api/product");
const orderRoute = require("./server/api/order");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productRoute);

app.get("/api", (req, res) => {
  res.send("Hello!");
});

app.use("/api/category/", category);
app.use("/api/order/", orderRoute);

app.listen(port, () => {
  console.log(`Successfully connected to port ${port}`);
});
