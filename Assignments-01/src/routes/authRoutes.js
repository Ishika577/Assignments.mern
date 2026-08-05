const express = require("express");

const {
  register,
  login,
  logout,
} = require("../controllers/AuthController");

const {
  validateRegister,
  validateLogin,
} = require("../validations/authValidation");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

router.post("/logout", logout);

module.exports = router;