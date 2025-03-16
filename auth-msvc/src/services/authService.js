const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const config = require("../config");
const { v4: uuidv4 } = require("uuid");

const generateAccessToken = (user) => {
  // JWT token object template
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

const generateRefreshToken = () => {
  return uuidv4(); // Generate a secure random token
};

const registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const user = new User({ username, email, password });
  await user.save();

  // return generateAccessToken(user);
  return { message: "User registered successfully", userId: user._id };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken, expiresIn: 7200 };
};

const logoutUser = async (refreshToken) => {
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("Invalid refresh token");

  user.refreshToken = null;
  await user.save();
  return { message: "User logged out successfully" };
};

module.exports = { registerUser, loginUser, logoutUser };
