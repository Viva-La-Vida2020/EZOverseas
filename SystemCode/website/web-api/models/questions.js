const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const Questions = sequelize.define(
    "questions",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "question_topics",
          key: "id",
        },
      },
      subject: {
        type: DataTypes.STRING(350),
        allowNull: true,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "questions",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "questions_ibfk_1_idx",
          using: "BTREE",
          fields: [{ name: "topic_id" }],
        },
      ],
    },
  );

  return Questions;
};
