const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

const category = require("./server/api/category");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("Hello!");
});

app.use("/api/category/", category);

app.listen(port, () => {
  console.log(`Successfully connected to port ${port}`);
});
