const {
  updateHealthMetrics,
  getHealthMetrics,
} = require("../services/healthMetricsService");

exports.updateHealthMetrics = async (req, res) => {
  try {
    const userId = req.query.userId;

    const response = await updateHealthMetrics(userId, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getHealthMetric = async (req, res) => {
  try {
    const userId = req.query.userId;

    const response = await getHealthMetrics(userId);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
