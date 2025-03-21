const {
  fetchSensorData,
  fetchActivityScore,
} = require("../services/sensorDataService");

exports.fetch = async (req, res) => {
  try {
    const response = await fetchSensorData(req.query.userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.fetchScore = async (req, res) => {
  try {
    const response = await fetchActivityScore(req.query.userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
