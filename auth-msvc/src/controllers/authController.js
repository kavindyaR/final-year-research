const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const status = await registerUser(userName, email, password);
    res.status(201).json(status);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginUser(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await logoutUser(refreshToken);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
