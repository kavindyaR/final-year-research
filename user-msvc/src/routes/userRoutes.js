const express = require("express");

const {
  fetchUserData,
  updateUserData,
  getProfile,
} = require("../controllers/userController");

const {
  authMiddleware,
  authorizeRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.get("/admin", authMiddleware, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

router.get("/", fetchUserData);
router.post("/update", updateUserData);

module.exports = router;
