const dns =require("dns");
dns.setServers(["8.8.8.8","8.8.4.4"]);

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Database Connection Failed");
    console.log(error.message);
  }
};

module.exports = connectDB;