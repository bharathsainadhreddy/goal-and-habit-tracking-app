require("dotenv").config({ path: __dirname + "/config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/router");

const PORT = process.env.PORT || 5001;

const app = express();
app.use(router);

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
