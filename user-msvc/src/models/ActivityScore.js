const mongoose = require("mongoose");

const ActivityScoreSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    date: { type: Date },
    types: { type: Number },
  },
  { collection: "activityscore" }
);

module.exports = mongoose.model("ActivityScore", ActivityScoreSchema);
