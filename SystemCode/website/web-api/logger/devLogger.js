const { createLogger, format, transports } = require("winston");
const { combine } = format;
const moment = require("moment");

const devLogger = createLogger({
  level: "debug",
  format: combine(
    format.errors({ stack: true }),
    format.metadata(),
    format.json(),
  ),
  defaultMeta: {
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./logs/combined.log" }),
  ],
});

module.exports = devLogger;
