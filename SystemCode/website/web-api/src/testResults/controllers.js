const DimensionTestResultServices = require("../dimensionTest/resultServices");
const HollandTestResultService = require("../hollandTest/resultServices");
const TestResultService = require("./services");

class TestResultsController {
  static async fetchUserResults(req, res, next) {
    try {
      const { user } = req;

      const results = await TestResultService.getTestResultsByUser(user.id);
      if (results.length === 0) {
        res.status(404).json({
          success: false,
          message: "未找到任何过往测试结果。",
          data: [],
        });
        return;
      }
      let i = 0;
      let data = [];
      while (i < results.length) {
        const resultObj = new TestResultService(results[i]);
        data.push(resultObj);
        i += 1;
      }

      let j = 0;
      while (j < data.length) {
        const details =
          data[j].title === "MBTI性格测试"
            ? await DimensionTestResultServices.fetchResultById(data[j].id)
            : await HollandTestResultService.fetchResultById(data[j].id);
        const resultDetailsInstance =
          data[j].title === "MBTI性格测试"
            ? new DimensionTestResultServices(details)
            : new HollandTestResultService(details);
        data[j].details = resultDetailsInstance.toJson();
        j += 1;
      }
      res.json({
        success: true,
        message: "",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async fetchUserResultsById(req, res, next) {
    try {
      //改成使用传入的id
      const { id } = req.params;
      // const { user } = req;

      const results = await TestResultService.getTestResultsByUser(Number(id));
      if (results.length === 0) {
        res.status(404).json({
          success: false,
          message: "未找到任何过往测试结果。",
          data: [],
        });
        return;
      }
      let i = 0;
      let data = [];
      while (i < results.length) {
        const resultObj = new TestResultService(results[i]);
        data.push(resultObj);
        i += 1;
      }

      let j = 0;
      while (j < data.length) {
        const details =
          data[j].title === "MBTI性格测试"
            ? await DimensionTestResultServices.fetchResultById(data[j].id)
            : await HollandTestResultService.fetchResultById(data[j].id);
        const resultDetailsInstance =
          data[j].title === "MBTI性格测试"
            ? new DimensionTestResultServices(details)
            : new HollandTestResultService(details);
        data[j].details = resultDetailsInstance.toJson();
        j += 1;
      }
      res.json({
        success: true,
        message: "",
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = TestResultsController;
