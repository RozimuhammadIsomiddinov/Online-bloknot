const { User } = require("../connectDB/connectDBUsers");
const winston = require("winston");

winston.add(
  new winston.transports.File({ filename: "../loggerPapka/winstonLogger" })
);
module.exports = async function loggerUser(req, res, next) {
  try {
    const getter = await User.find().select({ _id: 0, __v: 0 });
    res.send(getter);
    next();
  } catch (er) {
    winston.error(er.message, er);
    return res.status(500).send("An unexpected server error occurred");
  }
};
