const RankingDao = require("./dao");

class RankingService {
  constructor({ schoolRankingList, programRankingList } = {}) {
    this.schoolRankingList = schoolRankingList;
    this.programRankingList = programRankingList;
  }

  static async fetchRankingData() {
    const schoolRankingData = await RankingDao.getAllSchoolRankings();
    const programRankingData = await RankingDao.getAllProgramRankings();
    return {
      schoolRankingData,
      programRankingData,
    };
  }

  toJson() {
    return {
      schoolRankingList: this.schoolRankingList,
      programRankingList: this.programRankingList,
    };
  }
}
module.exports = RankingService;
