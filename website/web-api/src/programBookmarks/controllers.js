// const DimensionTestResultServices = require("../dimensionTest/resultServices");
// const HollandTestResultService = require("../hollandTest/resultServices");
const ProgramBookmarkService = require("./services");

class ProgramBookmarksController {
  static async fetchUserProgramBookmarks(req, res, next) {
    try {
      console.log(req);
      const { user } = req;

      const results = await ProgramBookmarkService.getProgramBookmarksByUserId(
        user.id,
      );
      if (results.length === 0) {
        res.status(404).json({
          success: false,
          message: "未找到任何收藏结果。",
          data: [],
        });
        return;
      }
      let i = 0;
      let data = [];
      while (i < results.length) {
        const resultObj = new ProgramBookmarkService(results[i]);
        data.push(resultObj);
        i += 1;
      }
      res.json({
        success: true,
        message: "",
        data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createUserProgramBookmark(req, res, next) {
    try {
      const { user, body } = req;
      if (!body || !body.programId) {
        res
          .status(400)
          .json({ success: false, message: "请求无法被处理，必要字段缺失。" });
        return;
      }

      const created =
        await ProgramBookmarkService.createProgramBookmarkByUserId(
          user.id,
          body,
        );
      if (created) {
        res.json({ success: true, message: "成功收藏专业。" });
      } else {
        res.json({
          success: false,
          message: "收藏专业失败，请勿重复收藏。",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteUserProgramBookmark(req, res, next) {
    try {
      const { user, params } = req;
      const deleted =
        await ProgramBookmarkService.deleteProgramBookmarkByUserId(
          user.id,
          params.bookmarkId,
        );
      if (deleted) {
        res.json({ success: true, message: "成功取消收藏专业。" });
      } else {
        res.json({
          success: false,
          message: "取消收藏专业失败，请确认收藏存在。",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ProgramBookmarksController;
