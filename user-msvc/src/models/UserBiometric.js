const mongoose = require("mongoose");

const UserBiometricSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bloodType: { type: String, required: true },
    salaryRange: { type: String, required: true },
    basePremium: { type: Number, required: true },
    habit: { type: Boolean, required: true },
    maritalStatus: { type: String, required: true },
    insurancePlan: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { _id: false } // ignore db generated '_id'
);

module.exports = mongoose.model("Biometric", UserBiometricSchema);
