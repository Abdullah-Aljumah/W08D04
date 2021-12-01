const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  desc: { type: String, require: true },
  time: { type: Date },
  isDel: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", comment);
