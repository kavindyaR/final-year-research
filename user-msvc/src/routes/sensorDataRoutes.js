const express = require("express");
const { fetch, fetchScore } = require("../controllers/sensorDataController");

const router = express.Router();

router.get("/get-sensor-data", fetch);
router.get("/fetch-activity-score", fetchScore);

module.exports = router;
