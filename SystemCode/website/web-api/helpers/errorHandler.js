const logger = require("../logger/index");

function errorHandler(err, req, res, next) {
  const env = req.app.get("env");
  console.log("err", err);
  logger.error(err);
  res.status(err.status || 500);
  res.json({
    success: false,
    code: 500,
    message: "无法处理该请求。",
    data: null,
  });
}

module.exports = errorHandler;
