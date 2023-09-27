const HollandTestService = require("./serivces");
const HollandTestResultService = require("./resultServices");

class TestController {
  static async getTestData(req, res, next) {
    try {
      const data = await HollandTestService.fetchTestingData();
      res.json({ success: true, message: "", data });
    } catch (err) {
      next(err);
    }
  }

  static async getHollandTestResultById(req, res, next) {
    try {
      const { params, user } = req;

      if (!params || !params.id) {
        res.status(400).json({ success: false, message: "无效的请求" });
        return;
      }

      const { id } = params;
      // find holland test result
      const foundResult =
        await HollandTestResultService.findResultByIdAndUserId(user.id, id);
      if (!foundResult) {
        res.status(404).json({
          success: false,
          message: "该记录不存在",
          data: null,
        });
        return;
      }
      const result = await HollandTestResultService.fetchResultById(id);
      const hollandTestResultInstance = new HollandTestResultService(result);
      res.json({
        success: true,
        message: "",
        data: hollandTestResultInstance.toJson(),
      });
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
      const savedResult = await HollandTestService.saveResultAndAnswers(
        body,
        user,
      );
      if (!savedResult) {
        res.status(500).json({ success: false, message: "保存失败" });
        return;
      }
      // const resultCodes =
      //   await HollandTestResultService.fetchCodesByResultCodeIds(
      //     savedResult.data.ids
      //   );
      // const resultDetails =
      //   await HollandTestResultService.fetchResultDetailsByTestResultId(
      //     savedResult.data.testResultId
      //   );
      res.json(savedResult);
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
      const savedResult = await HollandTestService.saveResultAndAnswers(
        body.OnEditAnswers,
        user,
      );

      //发送邮件
      try {
        HollandTestService.sendEmailToManager(
          body.userName,
          body.age,
          body.phoneNumber,
          body.source,
          body.reason,
          savedResult.data.newResultId,
        ); //这里把用户信息传进去
      } catch (error) {
        console.log("Can't send email");
      }

      res.json(savedResult);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TestController;
