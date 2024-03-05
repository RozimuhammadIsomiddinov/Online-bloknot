const winston = require("winston");
require("winston-mongodb");

// enable winston here if file, mongodb
//save mongodb to file every time I restart
//writes only if the mongodbini server is on
module.exports = function winstonWriteToDB() {
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/loggerMongoDb",
      level: "info",
    })
  );
  winston.add(new winston.transports.Console());
  // same works for console
  winston.add(
    new winston.transports.File({
      filename: "./loggerPapka/winstonLogger", //only writes the error level to this folder
      level: "error",
    })
  );
};
