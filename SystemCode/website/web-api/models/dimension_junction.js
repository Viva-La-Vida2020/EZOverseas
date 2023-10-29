const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "dimension_junction",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      dimension_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "dimensions",
          key: "id",
        },
      },
      dimension_combination_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "dimension_combination",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "dimension_junction",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "dimension_combination_id",
          using: "BTREE",
          fields: [{ name: "dimension_combination_id" }],
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
