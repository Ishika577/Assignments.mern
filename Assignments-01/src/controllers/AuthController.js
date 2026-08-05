const {
  registerService,
  loginService,
} = require("../services/authService");

const register = async (req, res) => {
  try {
    const user = await registerService(req.body);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const token = await loginService(req.body);

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};

module.exports = {
  register,
  login,
  logout,
};