const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const token = await registerUser(username, email, password);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ user, token });
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
