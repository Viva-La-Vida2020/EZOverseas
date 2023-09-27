const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "characteristics",
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
      summary: {
        type: DataTypes.STRING(350),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(2500),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      item_index: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "characteristics",
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
