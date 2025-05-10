const mongoose = require("mongoose");

const UserDataScehma = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    age: { type: Number, default: null },
    gender: { type: String, default: "" },
    blood_type: { type: String, default: "" },
    cholesterol_level: { type: Number, default: null },
    pulse: { type: Number, default: null },
    blood_sugar_level: { type: Number, default: null },
    systolic_bp: { type: Number, default: null },
    diastolic_bp: { type: Number, default: null },
    activity_level: { type: String, default: "" },
    membership_months: { type: Number, default: null },
    risk_level: { type: String, default: "" },
    bmi: { type: Number, default: null },
    habit: { type: String, default: "" },
    marital_status: { type: String, default: "" },
    occupation: { type: String, default: "" },
    monthly_income: { type: Number, default: null },
    base_premium: { type: Number, default: null },
    weight_kg: { type: Number, default: null },
    height_m: { type: Number, default: null },
    avg_bpm: { type: Number, default: null },
    fat_percentage: { type: Number, default: null },
    water_intake_liters: { type: Number, default: null },
    workout_frequency_days_per_week: { type: Number, default: null },
    experience_level: { type: Number, default: null },
    email: { type: String, default: "" },
  }
  // { _id: false } // ignore db generated '_id'
);

module.exports = mongoose.model("UserData", UserDataScehma);
