const { DataTypes, UniqueConstraintError } = require("sequelize");
const Programs = require("../../models/programs")(sequelize, DataTypes);
const ProgramBookmarks = require("../../models/program_bookmarks")(
  sequelize,
  DataTypes,
);
const ProgramInfo = require("../../models/program_info")(sequelize, DataTypes);

class ProgramBookmarkDAO {
  static async getProgramBookmarksByUserId(userId) {
    try {
      Programs.hasMany(ProgramBookmarks, {
        foreignKey: "program_id",
        targetKey: "id",
      });
      ProgramBookmarks.belongsTo(Programs, {
        foreignKey: "program_id",
        targetKey: "id",
      });

      Programs.hasMany(ProgramInfo, {
        foreignKey: "p_id",
        targetKey: "id",
      });
      ProgramInfo.belongsTo(Programs, {
        foreignKey: "p_id",
        targetKey: "id",
      });

      // Joins all 3 tables and fetch
      const bookmarkInfos = await ProgramBookmarks.findAll({
        attributes: ["id", "user_id", "program_id", "created_time"],
        where: { user_id: userId },
        include: {
          model: Programs,
          attributes: ["title"],
          where: { status: "open" },
          include: {
            model: ProgramInfo,
            attributes: ["content"],
            where: { status: "open", type: "brief" },
          },
        },
        raw: true,
      });

      // Merge program.program_infos.content
      // TODO order by info id
      let bookmarkInfosMerged = [];
      bookmarkInfos.forEach(function (bookmarkInfo) {
        var existing = bookmarkInfosMerged.filter(function (v, i) {
          return v.id == bookmarkInfo.id;
        });
        if (existing.length) {
          var existingIndex = bookmarkInfosMerged.indexOf(existing[0]);
          bookmarkInfosMerged[existingIndex]["program.program_infos.content"] +=
            bookmarkInfo["program.program_infos.content"];
        } else {
          bookmarkInfosMerged.push(bookmarkInfo);
        }
      });

      return bookmarkInfosMerged.map((item) => {
        return {
          userId: item.user_id,
          programBookmarkId: item.id,
          programId: item.program_id,
          programTitle: item["program.title"],
          programDescription: item["program.program_infos.content"],
          createdTime: item.created_time,
        };
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async createProgramBookmarkByUserId(userId, data) {
    try {
      return await ProgramBookmarks.create({
        user_id: userId,
        program_id: data.programId,
      });
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return false;
      }
      throw new Error(err);
    }
  }

  static async deleteProgramBookmarkByUserId(userId, bookmarkId) {
    try {
      return await ProgramBookmarks.destroy({
        where: { user_id: userId, id: bookmarkId },
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
module.exports = ProgramBookmarkDAO;
