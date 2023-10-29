const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "dimension_test_result",
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
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      test_result_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "test_results",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "dimension_test_result",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "dimension_id",
          using: "BTREE",
          fields: [{ name: "dimension_id" }],
        },
        {
          name: "test_result_id",
          using: "BTREE",
          fields: [{ name: "test_result_id" }],
        },
      ],
    },
  );
};
