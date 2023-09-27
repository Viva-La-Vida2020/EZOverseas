const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "dimension_combination_program_junction",
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
      program_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "programs",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "dimension_combination_program_junction",
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
        {
          name: "program_id",
          using: "BTREE",
          fields: [{ name: "program_id" }],
        },
      ],
    },
  );
};
