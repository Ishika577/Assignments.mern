require("dotenv").config();

const mongoose = require("mongoose");
const ReviewModel = require("./src/model/reviewModel");

const runTest = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // 1. Correct data
    const review = await ReviewModel.create({
      title: "good product",
      comment: "Delivery was fast and quality was good",
      rating: 5,
      reviewerName: "Rahul"
    });

    console.log("1. Correct data:", review);

    // 2. rating = 6
    await ReviewModel.create({
      title: "Good product",
      comment: "Product quality was good and better",
      rating: 6,
      reviewerName: "Rahul"
    });
  } catch (err) {
    console.log("Error:", err.message);
  } finally {
    await mongoose.connection.close();
  }
};

runTest();