const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const user = new User({ username, email, password });
  await user.save();
  return generateToken(user);
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    throw new Error("Invalid credentials");

  return generateToken(user);
};

const getJWTSecret = () => {
  return config.JWT_SECRET;
};

module.exports = { registerUser, loginUser, getJWTSecret };
