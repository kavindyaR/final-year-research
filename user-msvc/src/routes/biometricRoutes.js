const express = require("express");
const { create, fetch } = require("../controllers/biometricController");

const router = express.Router();

router.post("/create", create);
router.get("/fetch", fetch);

module.exports = router;
