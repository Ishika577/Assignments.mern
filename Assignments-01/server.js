require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");

const app = express();


app.use(express.json());
app.use(cookieParser());


connectDB();

app.get("/", (req, res) => {
  res.send("Server is Running...");
});


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});