const HealthMetric = require("../models/HealthMetric");

const updateHealthMetrics = async (userId, reqBody) => {
  const { margins, weights } = reqBody;

  // console.log(userId, reqBody);

  if (!margins && !weights) {
    return { message: "No update data provided." };
  }

  const updateData = {};

  if (margins) {
    Object.keys(margins).forEach((key) => {
      updateData[`margins.${key}`] = margins[key];
    });
  }

  if (weights) {
    Object.keys(weights).forEach((key) => {
      updateData[`weights.${key}`] = weights[key];
    });
  }

  const updatedMetric = await HealthMetric.findByIdAndUpdate(
    userId,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedMetric) {
    return { message: "Health Metrics not found." };
  }

  // return updatedMetric;
  return { message: "Health metrics updated successfully" };
};

const getHealthMetrics = async (userId) => {
  const healthMetric = await HealthMetric.findById(userId);

  if (!healthMetric) {
    return { message: "HealthMetric not found." };
  }

  return healthMetric;
};

module.exports = { updateHealthMetrics, getHealthMetrics };
