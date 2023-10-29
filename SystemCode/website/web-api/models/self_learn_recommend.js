const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "self_learn_recommend",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      item_index: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      p_id: {
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
      tableName: "self_learn_recommend",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "p_id",
          using: "BTREE",
          fields: [{ name: "p_id" }],
        },
      ],
    },
  );
};
