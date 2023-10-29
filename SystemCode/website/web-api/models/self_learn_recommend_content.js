const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "self_learn_recommend_content",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "self_learn_recommend",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      douban: {
        type: DataTypes.STRING(24),
        allowNull: true,
      },
      is_link: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "self_learn_recommend_content",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "parent_id",
          using: "BTREE",
          fields: [{ name: "parent_id" }],
        },
      ],
    },
  );
};
