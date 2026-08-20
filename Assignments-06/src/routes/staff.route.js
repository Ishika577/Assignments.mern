const express = require("express");

const {
  registerStaff,
  loginStaff,
  getMe,
} = require("../controllers/staffController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerStaff);

router.post("/login", loginStaff);

router.get("/me", authMiddleware, getMe);

module.exports = router;