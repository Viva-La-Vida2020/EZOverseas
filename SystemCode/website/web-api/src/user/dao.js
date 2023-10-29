const { DataTypes, Op } = require("sequelize");
const Clients = require("../../models/customers")(sequelize, DataTypes);
const ClientPhoneAuthRecords = require("../../models/customer_phone_auth")(
  sequelize,
  DataTypes,
);
const Inquiry = require("../../models/inquiry")(sequelize, DataTypes);
const moment = require("moment");

class ClientsDAO {
  static async fetchAllClients() {
    try {
      return await Clients.findAll({
        where: { status: "open" },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchClientByEmail(email) {
    try {
      return await Clients.findOne({
        where: { email, status: "open" },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchClientById(id) {
    try {
      return await Clients.findOne({
        where: { id, status: "open" },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchClientByPhone(phone) {
    try {
      return await Clients.findOne({
        where: { phone, status: "open" },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async fetchClientByUnionId(unionId) {
    try {
      return await Clients.findOne({
        where: { unionid: unionId, status: "open" },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async saveUser(data) {
    try {
      return await Clients.create({
        ...data,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async verifyEmailByToken(id) {
    try {
      return await Clients.update(
        {
          temporary_link: "",
          email_verified: 1,
        },
        {
          where: {
            id,
          },
        },
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  static async savePhoneAndCode(phone, code) {
    try {
      const expireTime = moment().add(45, "s").format("YYYY-MM-DD HH:mm:ss");
      const foundUnVerifiedRecord = await ClientPhoneAuthRecords.findOne({
        where: { phone, status: "temporary" },
        raw: true,
      });
      if (!foundUnVerifiedRecord) {
        return await ClientPhoneAuthRecords.create({
          phone,
          code,
          expireAt: expireTime,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          status: "temporary",
        });
      } else {
        return await ClientPhoneAuthRecords.update(
          {
            code,
            expireAt: expireTime,
          },
          {
            where: { phone, status: "temporary" },
          },
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findPhoneAndCode(phone) {
    try {
      return await ClientPhoneAuthRecords.findOne({
        where: { phone, status: "temporary" },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updatePhoneAuthRecord(phone) {
    try {
      return await ClientPhoneAuthRecords.update(
        {
          status: "verified",
          verifiedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          where: { phone, status: "temporary" },
        },
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findInquriyByEmailOrPhone(phone, email) {
    try {
      return await Inquiry.findAll({
        where: {
          [Op.or]: [{ phone }, { email }],
        },
        raw: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async saveInquiry(data) {
    try {
      return await Inquiry.create({
        phone: data.cellphone,
        name: data.fullName,
        email: data.email,
        wechat: data.wechatAccNo,
        city: data.city,
        school: data.school,
        age: 0,
        consultant: "",
        content: data.inquiry,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
module.exports = ClientsDAO;
