const express = require("express");
const { fetchUserData } = require("../controllers/userController");

const router = express.Router();

router.get("/", fetchUserData);

module.exports = router;
