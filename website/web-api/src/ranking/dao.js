const { DataTypes, Op } = require("sequelize");
const ProgramRankings = require("../../models/program_rankings")(
  sequelize,
  DataTypes,
);
const Programs = require("../../models/programs")(sequelize, DataTypes);
const Schools = require("../../models/schools2")(sequelize, DataTypes);

class RankingDAO {
  static async getAllProgramRankings() {
    try {
      Programs.hasMany(ProgramRankings, {
        foreignKey: "p_id",
      });
      ProgramRankings.belongsTo(Programs, {
        foreignKey: "p_id",
        targetKey: "id",
      });
      return await ProgramRankings.findAll({
        attributes: ["id", "university", "rank", "country", "logoPath"],
        include: {
          model: Programs,
          attributes: [
            ["id", "pId"],
            "title",
            "description",
            "pc_id",
            "related",
            "ranking_by",
            "nameForRanking",
          ],
          where: { status: "open" },
        },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchProgramRankingByNameForRanking(name) {
    try {
      Programs.hasMany(ProgramRankings, {
        foreignKey: "p_id",
      });
      ProgramRankings.belongsTo(Programs, {
        foreignKey: "p_id",
        targetKey: "id",
      });
      return await ProgramRankings.findAll({
        attributes: ["id", "university", "rank", "country", "logoPath"],
        include: {
          model: Programs,
          attributes: [
            ["id", "pId"],
            "title",
            "description",
            "pc_id",
            "related",
            "ranking_by",
            "nameForRanking",
          ],
          where: { nameForRanking: name },
        },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchProgramRankingBySchoolName(schoolName) {
    try {
      Programs.hasMany(ProgramRankings, {
        foreignKey: "p_id",
      });
      ProgramRankings.belongsTo(Programs, {
        foreignKey: "p_id",
        targetKey: "id",
      });
      return await ProgramRankings.findAll({
        attributes: ["id", "university", "rank", "country", "logoPath"],
        include: {
          model: Programs,
          attributes: [
            ["id", "pId"],
            "title",
            "description",
            "pc_id",
            "related",
            "ranking_by",
            "nameForRanking",
          ],
        },
        where: { university: schoolName },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getAllSchoolRankings() {
    try {
      return await Schools.findAll({
        attributes: ["id", "name", "region", "ranking", "logoPath"],
        where: { status: "open" },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = RankingDAO;
