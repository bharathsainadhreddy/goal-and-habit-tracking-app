const { User } = require("../schema/userCollectionSchema");
const jwt = require("jsonwebtoken");

// Add this function to the User model
User.prototype.createToken = function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.SECRET
  );
  return token;
};

module.exports = async (req, res, next) => {
  console.log("Making Call to Store User data on User collection");
  const { email, userName, mobileNumber, password } = req.body;

  const user = new User({
    email,
    userName,
    mobileNumber,
    password,
    deleted: false,
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  });

  try {
    await user.save();
    const token = user.createToken();
    console.log("Successfully registerd User data in User collection");
    res.status(201).json({
      message: "User successfully registered",
      token,
      userName,
    });
  } catch (err) {
    console.log("Error");
    console.log("Error", err, err.stack);
    res.status(400).json({ errors: err.errors });
  }
};
