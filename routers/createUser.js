const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validator } = require("../connectDB/connectDBUsers");

async function finder(name) {
  const finded = await User.find({ name: name });
  return finded[0];
}
router.post("/", async (req, res) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await finder(req.body.name);
  if (user)
    return res.status(400).send(`You are authenticated\nUse "users"- url`);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(req.body.password); // got salt
  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save();
  res.send(true);
});
module.exports = router;
