const { registerUser, loginUser } = require("../services/authService");

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
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
