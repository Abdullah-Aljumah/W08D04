const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  isDel: { type: Boolean, default: false },
  avatar: { type: String },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "61a734d2947e8eba47efbc6a",
  },
  activate: { type: Boolean, default: false },
  activateCode: { type: String },
  resetPass: { type: Boolean, default: false },
  resetCode: { type: String, },
});

module.exports = mongoose.model("User", user);
