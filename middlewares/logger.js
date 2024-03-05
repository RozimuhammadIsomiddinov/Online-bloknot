const { Categories } = require("../connectDB/connectDBCategory");
const winston = require("winston");

winston.add(
  new winston.transports.File({ filename: "../loggerPapka/winstonLogger" })
);
// What do you do when you have self-inflicted errors?
//1.when you open the file
//2. give the name of the file
// 3. select the file transport (File, Console, Loggly)
//4. then go down and write to the file

module.exports = async function logger(req, res, next) {
  try {
    const getter = await Categories.find().select({ _id: 0, __v: 0 });
    res.send(getter);
    next();
  } catch (er) {
    winston.error(er.message, er);

    return res.status(500).send("An unexpected server error occurred");
  }
};
