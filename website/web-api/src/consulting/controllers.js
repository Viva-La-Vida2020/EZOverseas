const ConsultingService = require("./services");
const moment = require("moment");

class ConsultingController {
  static async fetchAll(req, res, next) {
    try {
      const consultants = await ConsultingService.getAllConsoultants();
      let i = 0;
      let consultantArray = [];
      while (i < consultants.length) {
        const consultantInstance = new ConsultingService(consultants[i]);
        consultantArray.push(consultantInstance.toJson());
        i += 1;
      }
      const regions = await ConsultingService.getAllRegions();
      res.json({
        success: true,
        message: "",
        data: {
          consultants: consultantArray,
          regions,
          educationLevels: ["本科", "研究生", "博士"],
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async saveInquiry(req, res, next) {
    try {
      const { body, headers } = req;
      if (!body || !body.fullName || !body.inquiry) {
        res
          .status(400)
          .json({ success: false, message: "请求无法被处理，必要字段缺失。" });
        return;
      }
      const remoteIp = headers["x-forwarded-for"] || headers.origin;
      const foundExistingInquiry = await ConsultingService.findInquiryByIp(
        remoteIp,
        body.tutorId,
      );
      if (foundExistingInquiry) {
        res
          .status(400)
          .json({ success: false, message: "您已经向该导师提交了一次申请。" });
        return;
      }

      await ConsultingService.saveInquiryData({
        ...body,
        createAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        ip: remoteIp,
      });
      res.json({
        success: true,
        message: "您的信息已保存。",
        data: null,
      });
    } catch (e) {
      next(e);
    }
  }
}
module.exports = ConsultingController;
