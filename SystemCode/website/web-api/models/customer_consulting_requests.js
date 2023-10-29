const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "customer_consulting_requests",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tutor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cellphone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      wechat_account: {
        type: DataTypes.STRING(35),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(65),
        allowNull: true,
      },
      school: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      question: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      ip: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "customer_consulting_requests",
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
