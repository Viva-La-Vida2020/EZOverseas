const HollandTestDAO = require("./dao");
const calculateDeviation = require("../methods/hollandTest/deviation");
class HollandTestResultService {
  constructor({
    title,
    codes,
    resultDetails,
    jobs,
    programs,
    characteristics,
    overallDeviation,
  } = {}) {
    this.title = title;
    this.codes = codes;
    this.resultDetails = resultDetails;
    this.jobs = jobs;
    this.programs = programs;
    this.characteristics = characteristics;
    this.overallDeviation = overallDeviation;
  }

  toJson() {
    const convertedDetails = Array.isArray(this.resultDetails)
      ? this.resultDetails.map((item) => {
          return {
            id: item.id,
            total: item.total,
            deviation: parseFloat(item.deviation),
            code: item["holland_test_code.code"],
            codeId: item["holland_test_code.codeId"],
            desc: item["holland_test_code.description"],
            title: item["holland_test_code.title"],
            short: item["holland_test_code.short"],
          };
        })
      : [];

    const jobs = Array.isArray(this.jobs)
      ? this.jobs.map((item) => {
          return {
            code: item.code,
            codeGroup: item.code_combination,
            title: item["career_job.title"],
          };
        })
      : [];

    const programs = Array.isArray(this.programs)
      ? this.programs.map((item) => {
          return {
            code: item.code,
            codeGroup: item.code_combination,
            title: item["program.title"],
            pId: item["program.id"],
            pcId: item["program.pc_id"],
            relatedPrograms: item["program.related"]
              .split(" ")
              .filter((p) => p),
            rankingBy: item["program.ranking_by"],
            nameForRanking: item["program.nameForRanking"],
          };
        })
      : [];

    const characteristics = Array.isArray(this.characteristics)
      ? this.characteristics.map((item) => {
          return {
            code: item.code,
            category: item["holland_characteristic.type"],
            value: item["holland_characteristic.value"],
          };
        })
      : [];

    return {
      title: this.title,
      codes: this.codes,
      resultDetails: convertedDetails,
      jobs,
      programs,
      characteristics,
      overallDeviation: this.overallDeviation,
    };
  }

  static async findResultByIdAndUserId(userId, id) {
    return await HollandTestDAO.fetchTestResultByUserIdAndId(userId, id);
  }

  static async fetchResultById(id) {
    const foundDetails = await HollandTestDAO.getResultDetailsByResultId(id);
    if (!foundDetails || !foundDetails.result_codes) {
      return {
        success: false,
        message: "未找到该测试结果。",
        status: 404,
        data: null,
      };
    }
    const convertedIdList = foundDetails.result_codes.split(",");
    let i = 0;
    let resultCodes = [];
    while (i < convertedIdList.length) {
      const foundTopic = await HollandTestDAO.getQuestionTopicByTopicId(
        parseInt(convertedIdList[i]),
      );
      resultCodes.push(foundTopic);
      i += 1;
    }
    const foundResultDetails =
      await HollandTestDAO.getTestResultsByTestResultId(id);
    if (!foundResultDetails) {
      return {
        success: false,
        message: "未找到该测试结果的内容。",
        status: 404,
        data: null,
      };
    }
    const title = resultCodes
      .map((item) => item.code)
      .toString()
      .replaceAll(",", "");

    const majorCode = resultCodes[0].code;
    const jobs = await HollandTestDAO.getJobsByCode(majorCode);
    const programs = await HollandTestDAO.getProgramsByCode(majorCode);
    const characteristics = await HollandTestDAO.getCharacteristicsByCode(
      majorCode,
    );

    let overallDeviation = 0;
    //calculate deviation for all answers
    //get number of questions
    const answers = await HollandTestDAO.fetchAnswersByTestId(id);
    if (answers.length > 0) {
      overallDeviation = calculateDeviation(answers.map((a) => a.result));
    }
    return {
      title,
      codes: resultCodes,
      resultDetails: foundResultDetails,
      jobs,
      programs,
      characteristics,
      overallDeviation,
    };
  }

  static async fetchCodesByResultCodeIds(ids) {
    const convertedIdList = ids.split(",");
    let i = 0;
    let foundTopics = [];
    while (i < convertedIdList.length) {
      const foundTopic = await HollandTestDAO.getQuestionTopicByTopicId(
        parseInt(convertedIdList[i]),
      );
      foundTopics.push(foundTopic);
      i += 1;
    }
    return foundTopics;
  }

  static async fetchResultDetailsByTestResultId(testResultId) {
    const foundResultDetails =
      await HollandTestDAO.getTestResultsByTestResultId(testResultId);
    return foundResultDetails;
  }
}
module.exports = HollandTestResultService;
