const ProgramRankingService = require("./programRankingServices");
const SchoolRankingService = require("./schoolRankingServices");

class RankingController {
  static async fetchAll(req, res, next) {
    try {
      let programRankingList = [];
      // const programRankingData = await ProgramRankingService.fetchData();
      // if (programRankingData.length > 0) {
      //   programRankingData.forEach((item, index) => {
      //     const programRanking = new ProgramRankingService(item);
      //     programRankingList.push(programRanking.toJson());
      //   });
      // }

      let schoolRankingList = [];
      const schoolRankingData = await SchoolRankingService.fetchData();
      if (schoolRankingData.length > 0) {
        schoolRankingData.forEach((item, index) => {
          const schoolRanking = new SchoolRankingService(item);
          schoolRankingList.push(schoolRanking.toJson());
        });
      }
      res.json({
        success: true,
        message: "",
        data: { programRankingList, schoolRankingList },
      });
    } catch (err) {
      next(err);
    }
  }

  static async fetchProgramRankingByNameForRanking(req, res, next) {
    try {
      const { query } = req;
      if (!query || !query.nameforranking) {
        res
          .status(400)
          .json({ success: false, message: "请求无法被处理，必要字段缺失。" });
        return;
      }
      const data =
        await ProgramRankingService.fetchProgramRankingByNameForRanking(
          query.nameforranking,
        );
      let programRankingList = [];
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item) => {
          const programRanking = new ProgramRankingService(item);
          programRankingList.push(programRanking.toJson());
        });
      }
      res.json({
        success: true,
        message: "",
        data: programRankingList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async fetchProgramRankingBySchoolName(req, res, next) {
    try {
      const { params } = req;
      if (!params || !params.schoolName) {
        res
          .status(400)
          .json({ success: false, message: "请求无法被处理，必要字段缺失。" });
        return;
      }

      const data = await ProgramRankingService.fetchProgramRankingBySchoolName(
        params.schoolName,
      );
      let programRankingList = [];
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item) => {
          const programRanking = new ProgramRankingService(item);
          programRankingList.push(programRanking.toJson());
        });
      }
      res.json({
        success: true,
        message: "",
        data: programRankingList,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = RankingController;
