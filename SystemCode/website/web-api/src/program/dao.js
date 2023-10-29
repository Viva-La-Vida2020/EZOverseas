const { DataTypes, Op } = require("sequelize");
const Programs = require("../../models/programs")(sequelize, DataTypes);
const ProgramCategories = require("../../models/program_categories")(
  sequelize,
  DataTypes,
);
const Courses = require("../../models/program_course")(sequelize, DataTypes);
const ProgramInfo = require("../../models/program_info")(sequelize, DataTypes);
const SelfLearningInfo = require("../../models/self_learn_recommend")(
  sequelize,
  DataTypes,
);
const SelfLearningDetails =
  require("../../models/self_learn_recommend_content")(sequelize, DataTypes);
const ChildPrograms = require("../../models/child_program")(
  sequelize,
  DataTypes,
);
const Testimonials = require("../../models/program_testimonials")(
  sequelize,
  DataTypes,
);

class ProgramDAO {
  static async getProgramCategories() {
    try {
      return await ProgramCategories.findAll({
        attributes: ["id", "name", ["item_index", "index"], "image"],
        where: { status: "open" },
        order: [["item_index", "ASC"]],
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchProgramOptions() {
    try {
      let data = [];
      const categories = await this.getProgramCategories();
      if (categories.length > 0) {
        let i = 0;
        while (i < categories.length) {
          const details = await Programs.findAll({
            attributes: [
              ["id", "programId"],
              "title",
              "description",
              ["ranking_by", "rankingBy"],
              "nameForRanking",
            ],
            where: {
              [Op.and]: [{ pc_id: categories[i].id }, { status: "open" }],
            },
          });
          data.push({
            ...categories[i],
            details,
          });
          i += 1;
        }
      }
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getProfileByTitle(title) {
    try {
      const foundProgram = await Programs.findOne({
        attributes: [
          ["id", "programId"],
          "title",
          "description",
          ["ranking_by", "rankingBy"],
          "nameForRanking",
          "related",
        ],
        where: {
          [Op.and]: [{ title }, { status: "open" }],
        },
        raw: true,
      });
      return foundProgram;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getProgramByTitle(title) {
    try {
      const foundProgram = await this.getProfileByTitle(title);

      if (foundProgram.related && foundProgram.related.split(" ").length > 0) {
        foundProgram.relatedPrograms = await Programs.findAll({
          attributes: [
            ["id", "programId"],
            ["pc_id", "pcId"],
            "title",
            "description",
            ["ranking_by", "rankingBy"],
            "nameForRanking",
          ],
          where: {
            title: { [Op.in]: foundProgram.related.split(" ") },
          },
        });
      }

      const foundProgramCourses = await Courses.findAll({
        attributes: [
          "id",
          "name",
          "content",
          ["item_index", "index"],
          ["p_id", "pId"],
        ],
        where: {
          [Op.and]: [{ p_id: foundProgram.programId }, { status: "open" }],
        },
        raw: true,
      });

      const foundProgramInfo = await ProgramInfo.findAll({
        attributes: [
          "id",
          "content",
          ["p_index", "index"],
          ["p_id", "pId"],
          "type",
        ],
        where: {
          [Op.and]: [{ p_id: foundProgram.programId }, { status: "open" }],
        },
        raw: true,
      });

      const foundSelfLearnInfo = await SelfLearningInfo.findAll({
        attributes: [
          "id",
          "image",
          "title",
          ["item_index", "index"],
          ["p_id", "pId"],
        ],
        where: {
          [Op.and]: [{ p_id: foundProgram.programId }, { status: "open" }],
        },
        raw: true,
      });

      let selfLearningDataList = [];

      if (foundSelfLearnInfo.length > 0) {
        let i = 0;
        while (i < foundSelfLearnInfo.length) {
          const details = await SelfLearningDetails.findAll({
            where: {
              [Op.and]: [
                { parent_id: foundSelfLearnInfo[i].id },
                { status: "open" },
              ],
            },
            raw: true,
          });
          selfLearningDataList.push({ ...foundSelfLearnInfo[i], details });
          i += 1;
        }
      }

      const foundChildPrograms = await ChildPrograms.findAll({
        attributes: [
          "id",
          "name",
          "content",
          ["item_index", "index"],
          ["p_id", "pId"],
        ],
        where: {
          [Op.and]: [{ p_id: foundProgram.programId }, { status: "open" }],
        },
        raw: true,
      });

      const foundTestimonials = await Testimonials.findAll({
        attributes: [
          "id",
          "name",
          "feedback",
          "grade",
          "program",
          "school",
          ["p_id", "pId"],
        ],
        where: {
          [Op.and]: [{ p_id: foundProgram.programId }, { status: "open" }],
        },
        raw: true,
      });

      return {
        ...foundProgram,
        courses: foundProgramCourses,
        info: foundProgramInfo,
        childPrograms: foundChildPrograms,
        selfLearningInfo: selfLearningDataList,
        testimonials: foundTestimonials,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = ProgramDAO;
