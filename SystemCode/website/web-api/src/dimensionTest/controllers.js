const DimensionTestServices = require("./services");
const DimensionTestResultServices = require("./resultServices");

class DimensionTestController {
  static async getTestData(req, res, next) {
    try {
      const data = await DimensionTestServices.fetchTestingData();
      const dimensionTestObj = new DimensionTestServices(data);

      res.json({ success: true, message: "", data: dimensionTestObj.toJson() });
    } catch (err) {
      next(err);
    }
  }

  static async saveTestResult(req, res, next) {
    try {
      const { body, user } = req;
      if (!Array.isArray(body)) {
        res.status(400).json({
          success: false,
          message: "提交数据有问题，请求无法被处理。",
        });
        return;
      }
      const result = await DimensionTestServices.saveResultAndAnswers(
        body,
        user,
      );
      res.json({
        success: true,
        message: "",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async saveTestResultAndSendEmail(req, res, next) {
    try {
      const { body, user } = req;
      if (!Array.isArray(body.OnEditAnswers)) {
        res.status(400).json({
          success: false,
          message: "提交数据有问题，请求无法被处理。",
        });
        return;
      }
      const result = await DimensionTestServices.saveResultAndAnswers(
        body.OnEditAnswers,
        user,
      );
      //发送邮件
      try {
        DimensionTestServices.sendEmailToManager(
          body.userName,
          body.age,
          body.phoneNumber,
          body.source,
          body.reason,
          result.newResultId,
        ); //这里把用户信息传进去
      } catch (error) {
        console.log("Can't send email");
      }
      res.json({
        success: true,
        message: "",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getDimensionTestResultById(req, res, next) {
    try {
      const { params, user } = req;

      if (!params || !params.id) {
        res.status(400).json({ success: false, message: "无效的请求" });
        return;
      }

      const { id } = params;
      // find dimension test result
      const foundResult =
        await DimensionTestResultServices.findResultByIdAndUserId(user.id, id);
      if (!foundResult) {
        res.status(404).json({
          success: false,
          message: "该记录不存在",
          data: null,
        });
        return;
      }
      const testResult = await DimensionTestResultServices.fetchResultById(id);
      const testResultInstance = new DimensionTestResultServices(testResult);
      res.json({
        success: true,
        message: "",
        data: testResultInstance.toJson(),
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = DimensionTestController;
