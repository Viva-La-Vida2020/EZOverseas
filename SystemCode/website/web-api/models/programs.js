const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "programs",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(350),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(2500),
        allowNull: true,
      },
      link: {
        type: DataTypes.STRING(350),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      pc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      related: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      ranking_by: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      nameForRanking: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "programs",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    },
  );
};
