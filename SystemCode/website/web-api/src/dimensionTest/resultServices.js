const DimensionTestDAO = require("./dao");
const logger = require("../../logger/index");
const lodash = require("lodash");

class DimensionTestResultServices {
  constructor({
    id,
    title,
    tags,
    basic_analysis,
    career,
    characteristics,
    code,
    description,
    characterImg,
    jobs,
    majorDimensions,
    programs,
    weights,
  } = {}) {
    this.id = id;
    this.title = title;
    this.tags = tags.map((item) => {
      return { name: item.name };
    });
    this.basicAnalysis = basic_analysis;
    this.career = career;
    this.characteristics = characteristics;
    this.code = code;
    this.description = description;
    this.characterImg = characterImg;
    this.jobs = jobs;
    this.majorDimensions = majorDimensions;
    this.programs = programs;
    this.weights = weights;
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      tags: this.tags,
      basicAnalysis: this.basicAnalysis,
      career: this.career,
      characteristics: this.characteristics,
      code: this.code,
      description: this.description,
      characterImg: this.characterImg,
      jobs: this.jobs,
      dimensions: this.majorDimensions,
      programs: this.programs.map((item) => {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          link: item.link,
          programCategoryId: item.pc_id,
          relatedPrograms: item.related,
          rankingBy: item.ranking_by,
          programTitleForRanking: item.nameForRanking,
        };
      }),
      weights: this.weights,
    };
  }

  static async fetchTestingData() {
    return await DimensionTestDAO.fetchTestingData();
  }

  static async saveResultAndAnswers(formData, user) {
    return await DimensionTestDAO.saveResultAndAnswers(formData, user.id);
  }

  static async findResultByIdAndUserId(userId, id) {
    return await DimensionTestDAO.fetchTestResultByUserIdAndId(userId, id);
  }

  static async fetchResultById(id) {
    const resultWithDimensionInfo =
      await DimensionTestDAO.fetchResultWithDimension(id);
    const sortedResults = [...resultWithDimensionInfo].sort(
      (a, b) => a["dimension_id"] - b["dimension_id"],
    );
    let comparisonGroups = lodash.uniq(
      sortedResults.map((item) => item["dimension.compare_group"]),
    );
    let groupOfDimension = [];
    comparisonGroups.forEach((group, index) => {
      const sameGroupDimensions = sortedResults.filter(
        (result) => result["dimension.compare_group"] === group,
      );
      groupOfDimension.push(
        sameGroupDimensions.map((item) => {
          return {
            id: item.id,
            total: item.total,
            dimensionId: item["dimension_id"],
            code: item["dimension.code"],
            dimensionDesc: item["dimension.description"],
            dimensionTitle: item["dimension.title"],
          };
        }),
      );
    });
    let topScoreDimensions = [];
    groupOfDimension.forEach((group, index) => {
      const sortedGroup = group.sort((a, b) => b.total - a.total);
      topScoreDimensions.push(sortedGroup[0]);
    });

    const resultCodes = topScoreDimensions.map((item) => item.code).join("");
    const dimensionCombinationData =
      await DimensionTestDAO.fetchDimensionCombinationDataByCode(resultCodes);
    const characteristics =
      await DimensionTestDAO.fetchCharacteristicsByDimensionCombinationId(
        dimensionCombinationData.dcId,
      );
    const jobs = await DimensionTestDAO.fetchJobsByDimensionCombinationId(
      dimensionCombinationData.dcId,
    );
    const tags = await DimensionTestDAO.fetchTagsByDimensionCombinationId(
      dimensionCombinationData.dcId,
    );
    const programs =
      await DimensionTestDAO.fetchProgramByDimensionCombinationId(
        dimensionCombinationData.dcId,
      );

    return {
      id,
      code: resultCodes,
      ...dimensionCombinationData,
      characteristics,
      jobs,
      tags,
      programs,
      weights: groupOfDimension,
      majorDimensions: topScoreDimensions,
    };
  }
}

module.exports = DimensionTestResultServices;
