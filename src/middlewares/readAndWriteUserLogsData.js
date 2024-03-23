// logUserActions.js
const { Log } = require("../schema/userLogsSchema");

module.exports = async (req, res, next) => {
  console.log("Making Call to Logs collection");
  const { userName, action } = req.body;

  if (userName) {
    const newLog = new Log({
      userName,
      action,
      timestamp: new Date(),
    });

    try {
      await newLog.save();
      console.log("Successfully Stored request to Logs collection");
    } catch (err) {
      console.error("Error logging user action:", err, err.message);
    }
  }

  next();
};
