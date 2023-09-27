const lodash = require("lodash");

function calculateDeviation(values) {
  if (!Array.isArray(values) || values.find((item) => isNaN(parseInt(item)))) {
    return {
      success: false,
      message:
        "Failed to validate inputs, either inputs is not array or found any non-numeric value",
    };
  }

  const convertedNumericValues = values.map((item) => parseInt(item));

  const average = lodash.mean(convertedNumericValues);
  let results1 = 0;
  convertedNumericValues.forEach((item) => {
    results1 += Math.pow(item - average, 2);
  });
  return Math.sqrt(results1 / values.length);
}
module.exports = calculateDeviation;
