const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "program_rankings",
    {
      id: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true,
      },
      university: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      rank: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      logoPath: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      logoUrl: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      p_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "program_rankings",
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
