const express = require("express");
const { register, login, authMe } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMe);

module.exports = router;
