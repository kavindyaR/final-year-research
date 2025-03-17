const {
  createBiometric,
  fetchBiometric,
} = require("../services/biometricService");

exports.create = async (req, res) => {
  try {
    const response = await createBiometric(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.fetch = async (req, res) => {
  try {
    const response = await fetchBiometric(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
