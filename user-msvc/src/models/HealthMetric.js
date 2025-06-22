const mongoose = require("mongoose");

const defaultMargins = {
  ActiveEnergyBurned: 800,
  BasalEnergyBurned: 2250,
  HeartRate: 80,
  HeartRateVariabilitySDNN: 80,
  RestingHeartRate: 70,
  StepCount: 10000,
  WalkingHeartRateAverage: 110,
  WalkingStepLength: 80,
};

const defaultWeights = {
  ActiveEnergyBurned: 0.15,
  BasalEnergyBurned: 0.15,
  HeartRate: 0.25,
  HeartRateVariabilitySDNN: 0.05,
  RestingHeartRate: 0.05,
  StepCount: 0.15,
  WalkingHeartRateAverage: 0.1,
  WalkingStepLength: 0.1,
};

const metricFields = new mongoose.Schema(
  {
    ActiveEnergyBurned: Number,
    BasalEnergyBurned: Number,
    HeartRate: Number,
    HeartRateVariabilitySDNN: Number,
    OxygenSaturation: Number,
    RestingHeartRate: Number,
    StepCount: Number,
    WalkingHeartRateAverage: Number,
    WalkingStepLength: Number,
  },
  { _id: false } // disables _id in this nested schema
);

const HealthMetricSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },

    margins: {
      type: metricFields,
      default: defaultMargins,
    },

    weights: {
      type: metricFields,
      default: defaultWeights,
    },
  },
  {
    _id: false,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
  //   { _id: false, timestamps: true }
);

module.exports = mongoose.model("HealthMetric", HealthMetricSchema);
