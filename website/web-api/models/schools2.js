const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "schools2",
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
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      ranking: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      logoPath: {
        type: DataTypes.STRING(520),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(12),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "schools2",
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
