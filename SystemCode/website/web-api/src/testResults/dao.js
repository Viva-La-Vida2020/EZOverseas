const { DataTypes } = require("sequelize");
const Tests = require("../../models/tests")(sequelize, DataTypes);
const TestResults = require("../../models/test_results")(sequelize, DataTypes);

class TestResultDAO {
  static async getResultsByUserId(userId) {
    try {
      Tests.hasMany(TestResults, {
        foreignKey: "test_id",
      });
      TestResults.belongsTo(Tests, {
        foreignKey: "test_id",
        targetKey: "id",
      });
      const data = await TestResults.findAll({
        attributes: ["create_date", "id"],
        where: { user_id: userId },
        include: {
          model: Tests,
          attributes: ["title"],
          where: { status: "open" },
        },
        order: [["create_date", "DESC"]],
        raw: true,
      });
      return data.map((item) => {
        return {
          id: item.id,
          create_date: item.create_date,
          title: item["test.title"],
        };
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
module.exports = TestResultDAO;
