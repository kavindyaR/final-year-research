const mongoose = require("mongoose");

const UserDataScehma = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String },
    age: { type: Number },
    gender: { type: String },
    blood_type: { type: String },
    cholesterol_level: { type: Number },
    pulse: { type: Number },
    blood_sugar_level: { type: Number },
    systolic_bp: { type: Number },
    diastolic_bp: { type: Number },
    activity_level: { type: String },
    membership_months: { type: Number },
    risk_level: { type: String },
    bmi: { type: Number },
    habit: { type: String },
    marital_status: { type: String },
    occupation: { type: String },
    monthly_income: { type: Number },
    base_premium: { type: Number },
    weight_kg: { type: Number },
    height_m: { type: Number },
    avg_bpm: { type: Number },
    fat_percentage: { type: Number },
    water_intake_liters: { type: Number },
    workout_frequency_days_per_week: { type: Number },
    experience_level: { type: Number },
    email: { type: String },
  },
  { _id: false } // ignore db generated '_id'
);

module.exports = mongoose.model("UserData", UserDataScehma);
