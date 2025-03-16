const jwt = require("jsonwebtoken"); // remove later
const {
  registerUser,
  loginUser,
  getJWTSecret,
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
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.authMe = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const secret = getJWTSecret();
  console.log(token);

  try {
    const decoded = jwt.verify(token, secret);
    res.status(200).json({ user: { id: decoded.id } });
  } catch {
    res.status(401).send({ message: "Session expired" });
  }
};
