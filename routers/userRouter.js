const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, validator } = require("../connectDB/connectDBUsers");
const loggerUser = require("../middlewares/loggerUser");

async function finder(email) {
  const finded = await User.find({ email });
  return finded[0];
}

// API
router.get("/me", loggerUser).post("/users", async (req, res) => {
  const { error } = validator(req.body);
  if (error) res.send(error.details[0].message);
  const user = await finder(req.body.email);
  if (!user) return res.status(400).send("Email or password is incorrect...");

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) res.status(400).send("Email or password is incorrect.");

  const token = jwt.sign({ id: user._id }, "p@r01", { expiresIn: "15m" }); //generates this token
  res.header("x-users-token", token).send(true); //sends the token to this header
});
module.exports = router;
