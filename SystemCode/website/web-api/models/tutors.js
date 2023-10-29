const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tutors",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      nick_name: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      education: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      introduction: {
        type: DataTypes.STRING(1200),
        allowNull: true,
      },
      thumbnail: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(12),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tutors",
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
