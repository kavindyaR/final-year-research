const mongoose = require("mongoose");

const ActivityScoreSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    date: { type: Date },
    value: { type: Number }, // Changed from 'types' to 'value' to match Python backend
  },
  { collection: "activityscore" }
);

module.exports = mongoose.model("ActivityScore", ActivityScoreSchema);
