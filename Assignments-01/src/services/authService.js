const AuthModel = require("../models/AuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerService = async (data) => {
  const { name, email, password } = data;

  const existingUser = await AuthModel.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await AuthModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

const loginService = async (data) => {
  const { email, password } = data;

  const user = await AuthModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return token;
};

module.exports = {
  registerService,
  loginService,
};