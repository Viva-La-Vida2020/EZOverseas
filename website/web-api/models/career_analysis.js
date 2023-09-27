const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "career_analysis",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      dc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "dimension_combination",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING(350),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(2500),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "career_analysis",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "dc_id",
          using: "BTREE",
          fields: [{ name: "dc_id" }],
        },
      ],
    },
  );
};
