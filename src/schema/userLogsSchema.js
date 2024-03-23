const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  userName: {
    type: String,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model("Log_Collections", LogSchema);

module.exports = { Log };
