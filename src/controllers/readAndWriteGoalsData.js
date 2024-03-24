const { Goal } = require("../schema/goalCollectionSchema.js");

const createGoalsFromGoalsData = async (req, res) => {
  console.log("inside - Creating goals...");
  const { title, description, minTimelines, maxTimelines, userName } = req.body;
  try {
    const newGoal = new Goal({
      title,
      userName,
      description,
      minTimelines,
      maxTimelines,
      createdAt: new Date(),
      subTasks: [],
      lastUpdatedAt: new Date(),
    });

    const goalData = await newGoal.save();
    console.log("Goal Data saved to DB : ");
    res.status(201).json({
      title,
      userName,
      minTimelines,
      maxTimelines,
      _id: goalData._id,
      message: "Goal successfully registered",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const updateGoalsWithSubTaskData = async (req, res, next) => {
  console.log("inside - updateGoalsWithSubTaskData...");
  const {
    title,
    description,
    quantity,
    frequency,
    reminder,
    userName,
    goalTitle,
  } = req.body;

  try {
    const goal = await Goal.findOne({
      userName: userName,
      title: goalTitle,
    });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found." });
    }
    goal.subTasks.push({
      title: title,
      description: description,
      quantity: quantity,
      frequency: frequency,
      reminder: reminder,
      createdAt: new Date(),
      deleted: false,
      lastUpdatedAt: new Date(),
    });
    console.log("Goals-Subtask updated");
    await goal.save();
    res.status(201).json({
      message: "Goal updated with subtask successfully.",
      goal: goal,
    });
  } catch (error) {
    console.log("Goals-Subtask - update failed...");
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const updateGoalsFromEditReq = async (req, res) => {
  console.log("inside - Updating goals...");
  const { title, minTimelines, maxTimelines, userName, goalId } = req.body;
  try {
    const goal = await Goal.findOne({
      userName: userName,
      _id: goalId,
    });

    if (!goal) {
      console.log("No such goal found in the database for updating...");
      return res.status(404).json({ message: "Goal not found." });
    }

    goal.title = title;
    goal.minTimelines = minTimelines;
    goal.maxTimelines = maxTimelines;
    goal.lastUpdatedAt = new Date();
    console.log("Updated Goal: " + goal);
    await goal.save();
    res.status(201).json({
      message: "Goal updated with subtask successfully.",
      goal: goal,
    });
  } catch (error) {
    console.log("Goals - update failed...");
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const updateGoalsFromSubTaskEditReq = async (req, res) => {
  console.log("Edit-Goals-Subtask");
  const {
    title,
    quantity,
    frequency,
    reminder,
    userName,
    goalId,
    completed,
    subtaskId,
  } = req.body;
  try {
    const goal = await Goal.findOne({
      userName: userName,
      _id: goalId,
    });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found." });
    }
    goal.subTasks.forEach((eachSubtaskObj) => {
      const objectIdString = eachSubtaskObj._id.toString();
      if (objectIdString === subtaskId) {
        eachSubtaskObj.title = title;
        eachSubtaskObj.quantity = quantity;
        eachSubtaskObj.frequency = frequency;
        eachSubtaskObj.reminder = reminder;
        eachSubtaskObj.completed = completed;
      }
    });
    console.log("Edit-Goals-Subtask updated");
    await goal.save();
    res.status(201).json({
      message: "Goal updated with subtask successfully.",
      goal: goal,
    });
  } catch (error) {
    console.log("Edit-Goals-Subtask - update failed...");
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const displayGoalsOfUser = async (req, res, next) => {
  console.log("inside displayGoalsOfUser");
  const { userName } = req.body;

  try {
    const goalsList = await Goal.find({
      userName: userName,
    });
    if (!goalsList) {
      return res.status(201).json({ message: "Goal not found." });
    }
    res.status(201).json({
      message: "Goal updated with subtask successfully.",
      goal: goalsList,
    });
  } catch (error) {
    console.log("displayGoalsOfUser - failed...");
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createGoalsFromGoalsData,
  updateGoalsWithSubTaskData,
  updateGoalsFromEditReq,
  updateGoalsFromSubTaskEditReq,
  displayGoalsOfUser,
};
