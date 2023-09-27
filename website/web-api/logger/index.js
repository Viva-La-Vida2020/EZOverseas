const devLogger = require("./devLogger");
const prodLogger = require("./prodLogger");

const mainLogger =
  process.env.NODE_ENV === "development" ? devLogger : prodLogger;

module.exports = mainLogger;
