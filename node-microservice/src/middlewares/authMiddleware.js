const jwt = require("jsonwebtoken");
const config = require("../config");

// Verify JWT Token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid Token" });
  }
};

// Role-Based Access Control (RBAC)
const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role)
    return res.status(403).json({ error: "Access Denied" });
  next();
};

module.exports = { authMiddleware, authorizeRole };
