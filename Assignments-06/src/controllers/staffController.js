const jwt = require("jsonwebtoken");
const staffService = require("../services/staffService");

const registerStaff = async (req, res) => {
  try {
    const staff = await staffService.registerStaff(req.body);

    const staffResponse = staff.toObject();
    delete staffResponse.password;

    res.status(201).json({
      message: "Staff registered successfully",
      staff: staffResponse,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    const staff = await staffService.loginStaff(email, password);

    if (!staff) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: staff._id,
        department: staff.department,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const staff = req.user;

    const staffResponse = staff.toObject();
    delete staffResponse.password;

    res.status(200).json({
      staff: staffResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerStaff,
  loginStaff,
  getMe,
};