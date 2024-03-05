const mongoose = require("mongoose");
const Joi = require("joi");
const winston = require("winston");
const { winstonWrite } = require("../connectWinston/winstonConnector");
winstonWrite;

mongoose
  .connect("mongodb://localhost/ApiUser")
  .then(() => {
    winston.info("Created connection to mongodb...\nFor index");
  })
  .catch((er) => {
    console.log("A connection error occurred.");
  });
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);
function validator(value) {
  const valid = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(11).max(255),
    password: Joi.string().required().min(4).max(1024),
  });
  return valid.validate(value);
}
module.exports.User = User;
module.exports.validator = validator;
