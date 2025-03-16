const User = require("../models/User");

// Get user profile (Protected Route)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password") // Remove password
      .select("-__v"); // Remove unnecessary object element
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};
