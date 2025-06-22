const SensorData = require("../models/SensorData");
const ActivityScore = require("../models/ActivityScore");

const fetchSensorData = async (userId) => {
  const data = await SensorData.find({ user_id: userId });

  if (!data.length) {
    return { message: "No data found for the given user_id" };
  }

  return data;
};

const fetchActivityScore = async (userId) => {
  const data = await ActivityScore.find({ _id: userId });

  if (!data.length) {
    return { message: "No data found for the given user_id" };
  }

  return data;
};

module.exports = { fetchSensorData, fetchActivityScore };
