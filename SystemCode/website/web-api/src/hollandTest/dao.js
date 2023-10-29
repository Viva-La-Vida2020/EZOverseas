const { DataTypes, Op } = require("sequelize");
const moment = require("moment");
const Tests = require("../../models/tests")(sequelize, DataTypes);
const HollandTestCodes = require("../../models/holland_test_code")(
  sequelize,
  DataTypes,
);
const Questions = require("../../models/questions")(sequelize, DataTypes);
const QuestionTopics = require("../../models/question_topics")(
  sequelize,
  DataTypes,
);
const TestResults = require("../../models/test_results")(sequelize, DataTypes);
const HollandTestResult = require("../../models/holland_test_result")(
  sequelize,
  DataTypes,
);
const HollandTestResultQa = require("../../models/holland_test_result_qa")(
  sequelize,
  DataTypes,
);
const HollandTestResultDetails =
  require("../../models/holland_test_result_details")(sequelize, DataTypes);
const generateTopScoreTopics = require("../methods/hollandTest/generateTopScoreTopics");
const calculateDeviation = require("../methods/hollandTest/deviation");
const CareerJobs = require("../../models/career_jobs")(sequelize, DataTypes);
const HollandCharacteristics = require("../../models/holland_characteristics")(
  sequelize,
  DataTypes,
);
const HollandCodeAndJobJunction =
  require("../../models/holland_code_job_junction")(sequelize, DataTypes);
const HollandCodeAndCharacterJunction =
  require("../../models/holland_code_character_junction")(sequelize, DataTypes);
const HollandCodeAndProgramJunction =
  require("../../models/holland_code_program_junction")(sequelize, DataTypes);
const Programs = require("../../models/programs")(sequelize, DataTypes);
const logger = require("../../logger/index");

class HollandTestDAO {
  static async getTestBasicInfoByTitle() {
    try {
      return await Tests.findOne({
        where: {
          [Op.and]: [{ title: "霍兰德职业兴趣测试" }, { status: "open" }],
        },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getTopics() {
    try {
      return await HollandTestCodes.findAll({
        attributes: ["id", ["title", "name"], "code", "sequence"],
        where: { status: "open" },
        order: [["sequence", "ASC"]],
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getTestResultByUserId(id) {
    try {
      return await TestResults.findOne({
        where: { user_id: id },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getResultDetailsByResultId(id) {
    try {
      return await HollandTestResultDetails.findOne({
        where: { test_result_id: id },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getQuestionTopicByTopicId(topicId) {
    try {
      return await HollandTestCodes.findOne({
        attributes: ["id", ["title", "name"], "code", "description"],
        where: { status: "open", id: topicId },
        raw: true,
      });
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
            { test_id: 2 },
          ],
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getTestResultsByTestResultId(testResultId) {
    try {
      HollandTestCodes.hasMany(HollandTestResult, {
        foreignKey: "holland_code_id",
      });
      HollandTestResult.belongsTo(HollandTestCodes, {
        foreignKey: "holland_code_id",
        targetKey: "id",
      });

      return await HollandTestResult.findAll({
        attributes: ["id", "total", "deviation"],
        where: { test_result_id: testResultId },
        include: {
          model: HollandTestCodes,
          attributes: [
            ["id", "codeId"],
            "code",
            "description",
            "title",
            "short",
          ],
          where: { status: "open" },
        },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getJobsByCode(code) {
    try {
      CareerJobs.hasMany(HollandCodeAndJobJunction, {
        foreignKey: "jobId",
      });
      HollandCodeAndJobJunction.belongsTo(CareerJobs, {
        foreignKey: "jobId",
        targetKey: "id",
      });

      return await HollandCodeAndJobJunction.findAll({
        attributes: ["code", "code_combination"],
        where: { code },
        include: {
          model: CareerJobs,
          attributes: ["title"],
          where: { status: "open" },
        },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getCharacteristicsByCode(code) {
    try {
      HollandCharacteristics.hasMany(HollandCodeAndCharacterJunction, {
        foreignKey: "characterId",
      });
      HollandCodeAndCharacterJunction.belongsTo(HollandCharacteristics, {
        foreignKey: "characterId",
        targetKey: "id",
      });

      return await HollandCodeAndCharacterJunction.findAll({
        attributes: ["code"],
        where: { code },
        include: {
          model: HollandCharacteristics,
          attributes: ["type", "value"],
          where: { status: "open" },
        },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getProgramsByCode(code) {
    try {
      Programs.hasMany(HollandCodeAndProgramJunction, {
        foreignKey: "programId",
      });
      HollandCodeAndProgramJunction.belongsTo(Programs, {
        foreignKey: "programId",
        targetKey: "id",
      });

      return await HollandCodeAndProgramJunction.findAll({
        attributes: ["code", "code_combination"],
        where: { code },
        include: {
          model: Programs,
          attributes: [
            "title",
            "id",
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

  static async getNumberOfQuestionsByTestAndStatus() {
    try {
      let numberOfQuestions = [];
      const foundTest = await Tests.findOne({
        where: {
          [Op.and]: [{ title: "霍兰德职业兴趣测试" }, { status: "open" }],
        },
        raw: true,
      });
      if (!foundTest) {
        logger.warn(`Failed to fetch test by title 霍兰德职业兴趣测试`);
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
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchTestingData() {
    try {
      let data = {};

      const foundTest = await Tests.findOne({
        where: {
          [Op.and]: [{ title: "霍兰德职业兴趣测试" }, { status: "open" }],
        },
        raw: true,
      });
      if (!foundTest) {
        logger.warn(`Failed to fetch test by title 霍兰德职业兴趣测试`);
        return 0;
      }
      data.test = foundTest.title;
      const topics = await HollandTestCodes.findAll({
        attributes: ["id", ["title", "name"], "code"],
        where: { status: "open" },
        raw: true,
      });

      data.details = [];
      if (Array.isArray(topics) && topics.length > 0) {
        let i = 0;
        let questionArray = [];
        while (i < topics.length) {
          const questions = await Questions.findAll({
            attributes: ["id", "subject"],
            where: {
              [Op.and]: [{ topic_id: topics[i].id }, { status: "open" }],
            },
            raw: true,
          });
          questionArray = questionArray.concat(
            questions.map((item) => {
              return { ...item, topic: topics[i].name, topicId: topics[i].id };
            }),
          );
          i += 1;
        }
        data.details = questionArray;
      }
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async saveResultAndAnswers(answers, userId, testId, topics) {
    try {
      /** 执行一个SQL transaction */
      const result = await sequelize.transaction(async (t) => {
        //保存本次测试的记录
        const newResult = await TestResults.create(
          {
            test_id: testId,
            table_name: "holland_test_result",
            user_id: userId,
            create_date: moment().format("YYYY-MM-DD HH:mm:ss"),
            status: "open",
          },
          { transaction: t },
        );
        //开始准备保存本次测试的具体细节内容
        let i = 0;
        let orderedTopics = [];
        while (i < topics.length) {
          /** 按照code的id给答案进行分组 */
          const filteredFormData = answers.filter(
            (d) => d.topicId === topics[i].id,
          );
          /** 计算每个code组的答题总分 */
          const totalScore = filteredFormData
            .map((item) => item.value)
            .reduce((a, b) => {
              return parseInt(a) + parseInt(b);
            });
          /** 将分组的code数据存入该数组 */
          orderedTopics.push({ ...topics[i], total: totalScore });
          i += 1;
        }
        //计算每一个code组答案的标准差
        orderedTopics = orderedTopics.map((item) => {
          const deviation = calculateDeviation(
            answers.filter((a) => a.topicId === item.id).map((v) => v.value),
          );
          return {
            ...item,
            deviation,
          };
        });
        /** 按照得分高低重新排序 */
        orderedTopics.sort((a, b) => b.total - a.total);
        logger.info(`final ordered topics:`, orderedTopics);
        /** 准备数据，用于保存本次测试中每个code的总分，标准差 */
        const testResults = [...orderedTopics].map((item) => {
          return {
            holland_code_id: item.id,
            total: item.total,
            test_result_id: newResult.id,
            deviation: item.deviation.toFixed(8),
          };
        });
        //保存本次测试的全部code得分和标准差
        await HollandTestResult.bulkCreate(testResults, {
          transaction: t,
        });
        /** 准备数据，用于保存本次测试的答题情况 */
        const convertedFormDataList = answers.map((item) => {
          return {
            questionId: item.id,
            result: item.value,
            holland_test_result_id: newResult.id,
          };
        });
        /** 保存本次测试的全部答案到db */
        await HollandTestResultQa.bulkCreate([...convertedFormDataList], {
          transaction: t,
        });
        /** 产生最终排序的霍兰德codes */
        const topScoreTopics = generateTopScoreTopics(orderedTopics);
        /** 只保留最高的三个code */
        topScoreTopics.length = 3;
        //将本次测试的结果code组合保存到db
        await HollandTestResultDetails.create(
          {
            result_codes: topScoreTopics.map((item) => item.id).toString(),
            test_result_id: newResult.id,
          },
          { transaction: t },
        );
        /** 返回新保存的测试记录id */
        return newResult.id;
      });
      return {
        success: true,
        message: "测试结果已保存。",
        data: { newResultId: result },
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  static async fetchAnswersByTestId(testId) {
    try {
      return await HollandTestResultQa.findAll({
        attributes: ["id", "result"],
        where: { holland_test_result_id: testId },
        raw: true,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
module.exports = HollandTestDAO;
