const express = require("express");

const reviewRoutes = require("./routes/review.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Review API is running",
  });
});

app.use("/reviews", reviewRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.details || undefined,
  });
});

module.exports = app;