const { DataTypes, Op } = require("sequelize");
const logger = require("../../logger/index");
const moment = require("moment");
const lodash = require("lodash");
const Tests = require("../../models/tests")(sequelize, DataTypes);
const Questions = require("../../models/questions")(sequelize, DataTypes);
const QuestionTopics = require("../../models/question_topics")(
  sequelize,
  DataTypes,
);
const QuestionTypes = require("../../models/question_type")(
  sequelize,
  DataTypes,
);
const TestResults = require("../../models/test_results")(sequelize, DataTypes);
const Answers = require("../../models/answers")(sequelize, DataTypes);
const DimensionTestResults = require("../../models/dimension_test_result")(
  sequelize,
  DataTypes,
);
const Dimensions = require("../../models/dimensions")(sequelize, DataTypes);
const DimensionTags = require("../../models/dimension_tags")(
  sequelize,
  DataTypes,
);
const DimensionCombinations = require("../../models/dimension_combination")(
  sequelize,
  DataTypes,
);
const DimensionCombinationAndTagJunctions =
  require("../../models/dimension_combination_tags_junction")(
    sequelize,
    DataTypes,
  );
const DimensionCombinationAndProgramJunctions =
  require("../../models/dimension_combination_program_junction")(
    sequelize,
    DataTypes,
  );
const DimensionCombinationJunctions =
  require("../../models/dimension_junction")(sequelize, DataTypes);
const Characteristics = require("../../models/characteristics")(
  sequelize,
  DataTypes,
);
const Jobs = require("../../models/jobs")(sequelize, DataTypes);
const Programs = require("../../models/programs")(sequelize, DataTypes);

class DimensionTestDAO {
  static async getTestBasicInfoByTitle() {
    try {
      return await Tests.findOne({
        where: {
          [Op.and]: [{ title: "MBTI性格测试" }, { status: "open" }],
        },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getTopics(testId) {
    try {
      return await QuestionTopics.findAll({
        attributes: ["id", "name"],
        where: { status: "open", test_id: testId },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getNumberOfQuestionsByTestAndStatus() {
    let numberOfQuestions = [];
    const foundTest = await Tests.findOne({
      where: {
        [Op.and]: [{ title: "MBTI性格测试" }, { status: "open" }],
      },
      raw: true,
    });
    if (!foundTest) {
      loggers.warn(`Failed to fetch test by title MBTI性格测试`);
      return 0;
    }
    QuestionTopics.hasMany(Questions);

    Questions.belongsTo(QuestionTopics, {
      foreignKey: "topic_id",
    });
    numberOfQuestions = await Questions.count({
      include: {
        model: QuestionTopics,
        where: {
          test_id: {
            [Op.eq]: foundTest.id,
          },
        },
      },
    });
    return numberOfQuestions;
  }

  static async getQuestionTypesByTest(testId) {
    try {
      return await QuestionTypes.findAll({
        attributes: ["id", "name", "questions_per_page"],
        where: { status: "open", test_id: testId },
        raw: true,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getAllAnswers() {
    try {
      return await Answers.findAll({
        attributes: ["id", "question_id", "subject", "dimension_id"],
        where: { status: "open" },
        raw: true,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getAllQuestions(questionTypes) {
    try {
      return await Questions.findAll({
        attributes: ["id", "subject", "topic_id", "type_id"],
        where: {
          status: "open",
          type_id: {
            [Op.or]: questionTypes.map((item) => item.id),
          },
        },
        raw: true,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  static async fetchTestingData() {
    try {
      let data = {};

      const foundTest = await this.getTestBasicInfoByTitle();
      data.test = foundTest.title;
      data.topics = await this.getTopics(foundTest.id);
      data.questionTypes = await this.getQuestionTypesByTest(foundTest.id);
      data.questions = await this.getAllQuestions(data.questionTypes);
      data.answers = await this.getAllAnswers();
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async saveResultAndAnswers(answers, userId) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const foundTest = await this.getTestBasicInfoByTitle();

        //save test result record to the test_results table
        const newResult = await TestResults.create(
          {
            test_id: foundTest.id,
            table_name: "dimension_test_result",
            user_id: userId,
            create_date: moment().format("YYYY-MM-DD HH:mm:ss"),
            status: "open",
          },
          { transaction: t },
        );

        const dimensions = lodash.uniq(answers.map((item) => item.dimensionId));
        let resultOfDimensions = [];
        dimensions.forEach((dimension) => {
          const filteredAnswers = answers.filter(
            (item) => item.dimensionId === dimension,
          );
          resultOfDimensions.push({
            dimension_id: dimension,
            total: filteredAnswers.length,
            test_result_id: newResult.id,
          });
        });

        //save all scores
        await DimensionTestResults.bulkCreate(resultOfDimensions, {
          transaction: t,
        });
        return newResult.id;
      });
      return { newResultId: result };
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchTestResultByUserIdAndId(userId, id) {
    try {
      return await TestResults.findOne({
        where: {
          [Op.and]: [
            { id },
            // { user_id: userId },
            { status: "open" },
            { test_id: 1 },
          ],
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchResultWithDimension(id) {
    try {
      Dimensions.hasMany(DimensionTestResults, {
        foreignKey: "dimension_id",
      });
      DimensionTestResults.belongsTo(Dimensions, {
        foreignKey: "dimension_id",
        targetKey: "id",
      });

      return await DimensionTestResults.findAll({
        attributes: ["id", "total", "dimension_id"],
        where: { test_result_id: id },
        include: {
          model: Dimensions,
          attributes: [
            ["id", "dimensionId"],
            "code",
            "description",
            "title",
            "compare_group",
          ],
          where: { status: "open" },
        },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchDimensionCombinationDataByCode(code) {
    try {
      return await DimensionCombinations.findOne({
        attributes: [
          ["id", "dcId"],
          "code",
          "title",
          "description",
          "basic_analysis",
          "characterImg",
        ],
        where: { code },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchCharacteristicsByDimensionCombinationId(dcId) {
    try {
      return await Characteristics.findAll({
        attributes: ["summary", "description", "type"],
        where: { dc_id: dcId },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchJobsByDimensionCombinationId(dcId) {
    try {
      return await Jobs.findAll({
        attributes: ["title", "description"],
        where: { [Op.and]: [{ dc_id: dcId }, { status: "open" }] },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchTagsByDimensionCombinationId(dcId) {
    try {
      DimensionTags.hasMany(DimensionCombinationAndTagJunctions, {
        foreignKey: "tag_id",
      });
      DimensionCombinationAndTagJunctions.belongsTo(DimensionTags, {
        foreignKey: "tag_id",
        targetKey: "id",
      });

      return await DimensionTags.findAll({
        attributes: ["name"],
        where: { status: "open" },
        include: {
          model: DimensionCombinationAndTagJunctions,
          where: { dc_id: dcId },
        },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchProgramByDimensionCombinationId(dcId) {
    try {
      Programs.hasMany(DimensionCombinationAndProgramJunctions, {
        foreignKey: "program_id",
      });
      DimensionCombinationAndProgramJunctions.belongsTo(Programs, {
        foreignKey: "program_id",
        targetKey: "id",
      });

      return await Programs.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "link",
          "pc_id",
          "related",
          "ranking_by",
          "nameForRanking",
        ],
        where: { status: "open" },
        include: {
          model: DimensionCombinationAndProgramJunctions,
          where: { dc_id: dcId },
        },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
module.exports = DimensionTestDAO;
