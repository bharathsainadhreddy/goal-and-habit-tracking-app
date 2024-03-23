const mongoose = require("mongoose");

const SubtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  reminder: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  minTimelines: {
    type: Date,
    default: Date.now,
  },
  maxTimelines: {
    type: Date,
    default: Date.now,
  },
  subTasks: [SubtaskSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const Goal = mongoose.model("Goal_Collections", GoalSchema);

module.exports = { Goal };
