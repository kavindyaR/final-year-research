const express = require("express");
const {
  fetchUserData,
  updateUserData,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", fetchUserData);
router.post("/update", updateUserData);

module.exports = router;
