const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "customers",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_study_aboard: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      how_know: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      nick_name: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      sex: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      headImg: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      unionid: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      openid: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      temporary_link: {
        type: DataTypes.STRING(72),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      date_time: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      ip: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      register_by: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      email_verified: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "customers",
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
