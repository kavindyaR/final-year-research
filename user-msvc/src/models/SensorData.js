const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    user_id: { type: String, required: true },
    types: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { collection: "sensordata" }
);

module.exports = mongoose.model("SensorData", SensorDataSchema);
