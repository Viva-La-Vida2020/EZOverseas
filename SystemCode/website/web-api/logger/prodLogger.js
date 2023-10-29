const { createLogger, format, transports } = require("winston");
const { combine, label, printf, timestamp, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${label}] ${timestamp} ${level}: ${message}`;
});

const prodLogger = createLogger({
  level: "info",
  format: combine(
    colorize(),
    label({ label: "Production" }),
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./logs/production.log" }),
  ],
});

module.exports = prodLogger;
