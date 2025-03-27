const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "finance"], default: "user" },
  isDataProvided: { type: Boolean, default: false },
  refreshToken: { type: String, default: null },
});

module.exports = mongoose.model("User", UserSchema);
