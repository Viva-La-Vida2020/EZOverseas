const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "program_testimonials",
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
      feedback: {
        type: DataTypes.STRING(1500),
        allowNull: false,
      },
      school: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      program: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      grade: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      p_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "programs",
          key: "id",
        },
      },
      status: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "program_testimonials",
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
