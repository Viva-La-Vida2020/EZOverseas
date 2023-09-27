const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "answers",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "questions",
          key: "id",
        },
      },
      subject: {
        type: DataTypes.STRING(350),
        allowNull: false,
      },
      dimension_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "dimensions",
          key: "id",
        },
      },
      status: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "answers",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "question_id",
          using: "BTREE",
          fields: [{ name: "question_id" }],
        },
        {
          name: "dimension_id",
          using: "BTREE",
          fields: [{ name: "dimension_id" }],
        },
      ],
    },
  );
};
