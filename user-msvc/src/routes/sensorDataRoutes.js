const express = require("express");
const { fetch } = require("../controllers/sensorDataController");

const router = express.Router();

router.get("/get-sensor-data", fetch);

module.exports = router;
