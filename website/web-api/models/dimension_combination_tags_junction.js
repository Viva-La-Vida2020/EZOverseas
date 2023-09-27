const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "dimension_combination_tags_junction",
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
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "dimension_tags",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "dimension_combination_tags_junction",
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
          name: "tag_id",
          using: "BTREE",
          fields: [{ name: "tag_id" }],
        },
      ],
    },
  );
};
