const dotenv = require("dotenv");
const express = require("express");

// Import routes
const Auth = require("./server/api/auth");
const User = require("./server/api/user");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route middlewares
app.use("/api", Auth);
app.use("/api", User);

app.get("/api", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Successfully connected to port ${port}`);
});
