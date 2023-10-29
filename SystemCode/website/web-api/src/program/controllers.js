const ProgramService = require("./services");
const Client = require("../user/services");

class ProgramController {
  static async getProgramOptions(req, res, next) {
    try {
      const programs = await ProgramService.fetchProgramOptions();
      res.json({ sucess: true, message: "", data: programs });
    } catch (err) {
      next(err);
    }
  }

  static async getProgramDetailsByTitle(req, res, next) {
    try {
      const { title } = req.params;
      if (!title.replace(/ /g, "")) {
        res.status(400).json({ success: false, message: "无效的请求" });
        return;
      }
      const data = await ProgramService.fetchProgramByTitle(title);
      res.json({
        success: data ? true : false,
        message: data ? "" : "无法处理",
        data,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ProgramController;
