const mongoose = require("mongoose");

const UserBiometricSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bloodType: { type: String, required: true },
    salaryRange: { type: String, required: true },
  },
  { _id: false }
);

module.exports = mongoose.model("Biometric", UserBiometricSchema);
