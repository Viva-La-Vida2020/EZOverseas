const RankingDao = require("./dao");

class ProgramRankingService {
  constructor({
    id,
    university,
    ranking,
    country,
    logoPath,
    pId,
    programTitle,
    programDesc,
    pcId,
    relatedPrograms,
    rankingBy,
    nameForRanking,
  } = {}) {
    this.id = id;
    this.university = university;
    this.ranking = ranking;
    this.country = country;
    this.logoPath = logoPath;
    this.pId = pId;
    this.programTitle = programTitle;
    this.programDesc = programDesc;
    this.pcId = pcId;
    this.relatedPrograms = relatedPrograms;
    this.rankingBy = rankingBy;
    this.nameForRanking = nameForRanking;
  }

  static organizeDataItem(data) {
    return {
      id: data.id,
      university: data.university,
      ranking: data.rank,
      country: data.country,
      logoPath: data.logoPath,
      pId: data["program.pId"],
      programTitle: data["program.title"],
      programDesc: data["program.description"],
      pcId: data["program.pc_id"],
      relatedPrograms: data["program.related"],
      rankingBy: data["program.ranking_by"],
      nameForRanking: data["program.nameForRanking"],
    };
  }

  static async fetchData() {
    const data = await RankingDao.getAllProgramRankings();
    if (data.length > 0) {
      return data.map((item) => {
        return this.organizeDataItem(item);
      });
    }
  }

  static async fetchProgramRankingByNameForRanking(name) {
    const data = await RankingDao.fetchProgramRankingByNameForRanking(name);
    if (data.length > 0) {
      return data.map((item) => this.organizeDataItem(item));
    }
  }

  static async fetchProgramRankingBySchoolName(schoolName) {
    const data = await RankingDao.fetchProgramRankingBySchoolName(schoolName);
    if (data.length > 0) {
      return data.map((item) => {
        return {
          id: item.id,
          university: item.university,
          ranking: item.rank,
          country: item.country,
          logoPath: item.logoPath,
          pId: item["program.pId"],
          programTitle: item["program.title"],
          programDesc: item["program.description"],
          pcId: item["program.pc_id"],
          relatedPrograms: item["program.related"],
          rankingBy: item["program.ranking_by"],
          nameForRanking: item["program.nameForRanking"],
        };
      });
    }
  }

  toJson() {
    return {
      id: this.id,
      university: this.university,
      ranking: this.ranking,
      country: this.country,
      logoPath: this.logoPath,
      pId: this.pId,
      programTitle: this.programTitle,
      programDesc: this.programDesc,
      pcId: this.pcId,
      relatedPrograms: this.relatedPrograms,
      rankingBy: this.rankingBy,
      nameForRanking: this.nameForRanking,
    };
  }
}
module.exports = ProgramRankingService;
