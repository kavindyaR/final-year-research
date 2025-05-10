const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const config = require("../config");
const User = require("../models/User");
const UserData = require("../models/UserData");

const generateAccessToken = (user) => {
  // JWT token object template
  return jwt.sign(
    {
      userId: user._id,
      userRole: user.role,
    },
    config.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

// Generate a secure random refresh token
const generateRefreshToken = () => {
  return uuidv4();
};

const registerUser = async (userName, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const user = new User({ userName, email, password });
  await user.save();

  const userData = new UserData({
    _id: user._id,
    userId: user._id,
    name: userName,
    email,
  });
  await userData.save();

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

  // Convert to plain object and remove fields
  const userObject = user.toObject();
  userObject.userId = userObject._id;
  delete userObject._id;
  delete userObject.password;
  delete userObject.__v;

  return {
    ...userObject,
    token: accessToken,
  };
};

const logoutUser = async (refreshToken) => {
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("Invalid refresh token");

  user.refreshToken = null;
  await user.save();
  return { message: "User logged out successfully" };
};

module.exports = { registerUser, loginUser, logoutUser };
