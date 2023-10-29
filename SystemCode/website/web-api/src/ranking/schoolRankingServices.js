const RankingDao = require("./dao");

class SchoolRankingService {
  constructor({ id, name, ranking, region, logoPath, status } = {}) {
    this.id = id;
    this.name = name;
    this.ranking = ranking;
    this.region = region;
    this.logoPath = logoPath;
    this.status = status;
  }

  static async fetchData() {
    return await RankingDao.getAllSchoolRankings();
  }

  toJson() {
    return {
      id: this.id,
      university: this.name,
      ranking: this.ranking,
      country: this.region,
      logoPath: this.logoPath,
    };
  }
}
module.exports = SchoolRankingService;
