const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "schools",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      region: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tutor_region",
          key: "id",
        },
      },
      status: {
        type: DataTypes.STRING(12),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "schools",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "region",
          using: "BTREE",
          fields: [{ name: "region" }],
        },
      ],
    },
  );
};
