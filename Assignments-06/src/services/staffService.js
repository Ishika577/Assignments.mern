const bcrypt = require("bcrypt");
const Staff = require("../models/staffModel");

const registerStaff = async (staffData) => {
  const existingStaff = await Staff.findOne({
    email: staffData.email,
  });

  if (existingStaff) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  const staff = await Staff.create(staffData);

  return staff;
};

const loginStaff = async (email, password) => {
  const staff = await Staff.findOne({ email });

  if (!staff) {
    return null;
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    staff.password
  );

  if (!isPasswordCorrect) {
    return null;
  }

  return staff;
};

const getStaffById = async (id) => {
  return await Staff.findById(id).select("-password");
};

module.exports = {
  registerStaff,
  loginStaff,
  getStaffById,
};