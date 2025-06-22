const User = require("../models/User");
const {
  getUserById,
  getAllUsers,
  updateUserData,
} = require("../services/userService");

exports.fetchUserData = async (req, res) => {
  try {
    const { id } = req.query;
    let response = null;

    if (id) {
      response = await getUserById(id);
    } else {
      response = await getAllUsers();
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserData = async (req, res) => {
  try {
    const { id } = req.query;

    const response = await updateUserData(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user profile (Protected Route)
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId)
      .select("-password") // Remove password
      .select("-__v"); // Remove unnecessary object element
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};
