const express = require("express");
const {
  updateHealthMetrics,
  getHealthMetric,
} = require("../controllers/healthMetricsController");

const router = express.Router();

router.get("/", getHealthMetric);
router.patch("/update", updateHealthMetrics);

module.exports = router;
