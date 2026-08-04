const express = require("express");

const {
  register,
  login,
  logout,
} = require("../controllers/AuthController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;