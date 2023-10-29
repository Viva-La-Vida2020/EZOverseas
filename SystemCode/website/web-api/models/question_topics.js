const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const QuestionTopics = sequelize.define(
    "question_topics",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      test_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tests",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "question_topics",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "test_id",
          using: "BTREE",
          fields: [{ name: "test_id" }],
        },
      ],
    },
  );
  return QuestionTopics;
};
