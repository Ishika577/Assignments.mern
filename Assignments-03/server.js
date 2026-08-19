const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const reviewRouter = require("./src/routes/review.route");

const app = express();

app.use(express.json());

app.use("/review", reviewRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
  });


