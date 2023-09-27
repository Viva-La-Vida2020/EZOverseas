const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tutor_program_junction",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      tutor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      program_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      education: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      school_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scholarship: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tutor_program_junction",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "program_id",
          using: "BTREE",
          fields: [{ name: "program_id" }],
        },
        {
          name: "school_id",
          using: "BTREE",
          fields: [{ name: "school_id" }],
        },
        {
          name: "tutor_id",
          using: "BTREE",
          fields: [{ name: "tutor_id" }],
        },
      ],
    },
  );
};
