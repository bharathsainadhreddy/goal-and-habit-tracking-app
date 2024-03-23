const cors = require("cors");
const express = require("express");
const userLogsUpdate = require("./middlewares/readAndWriteUserLogsData.js");
const usersDataController = require("./controllers/readAndWriteUserInfo.js");
const {
  createGoalsFromGoalsData,
  updateGoalsWithSubTaskData,
  updateGoalsFromEditReq,
  updateGoalsFromSubTaskEditReq,
  displayGoalsOfUser,
} = require("./controllers/readAndWriteGoalsData.js");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/register", userLogsUpdate, usersDataController);
app.post("/api/goals", userLogsUpdate, createGoalsFromGoalsData);
app.post("/api/subtasks", userLogsUpdate, updateGoalsWithSubTaskData);
app.post("/api/subtasks/edit", userLogsUpdate, updateGoalsFromSubTaskEditReq);
app.post("/api/goals/edit", userLogsUpdate, updateGoalsFromEditReq);
app.post("/api/goals/list", userLogsUpdate, displayGoalsOfUser);

module.exports = app;
