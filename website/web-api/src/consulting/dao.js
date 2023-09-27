const { DataTypes } = require("sequelize");
const Consultants = require("../../models/tutors")(sequelize, DataTypes);
const Regions = require("../../models/tutor_region")(sequelize, DataTypes);
const ConsultantProgramJunction =
  require("../../models/tutor_program_junction")(sequelize, DataTypes);
const Programs = require("../../models/programs")(sequelize, DataTypes);
const Schools = require("../../models/schools")(sequelize, DataTypes);
const CustomerInquiry = require("../../models/customer_consulting_requests")(
  sequelize,
  DataTypes,
);

class ConsultingDAO {
  static async getAllConsultants() {
    try {
      let consultantData = [];
      consultantData = await Consultants.findAll({
        where: {
          status: "open",
        },
        raw: true,
      });

      if (!Array.isArray(consultantData) || consultantData.length === 0) {
        return [];
      }
      Programs.hasMany(ConsultantProgramJunction, {
        foreignKey: "program_id",
      });
      ConsultantProgramJunction.belongsTo(Programs, {
        foreignKey: "program_id",
        targetKey: "id",
      });

      Schools.hasMany(ConsultantProgramJunction, {
        foreignKey: "school_id",
      });
      ConsultantProgramJunction.belongsTo(Schools, {
        foreignKey: "school_id",
        targetKey: "id",
      });

      const details = await ConsultantProgramJunction.findAll({
        where: {
          status: "open",
        },
        include: [
          {
            model: Programs,
            attributes: [
              ["id", "programId"],
              "ranking_by",
              "nameForRanking",
              ["title", "programTitle"],
            ],
            where: { status: "open" },
          },
          {
            model: Schools,
            attributes: [["id", "schoolId"], "region", ["name", "schoolName"]],
            where: { status: "open" },
          },
        ],
        raw: true,
      });
      let i = 0;
      while (i < consultantData.length) {
        consultantData[i].details = details.filter(
          (item) => item.tutor_id === consultantData[i].id,
        );
        i += 1;
      }
      return consultantData;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async fetchRegions() {
    try {
      const data = await Regions.findAll({
        attributes: ["id", ["r_index", "index"], "name"],
        where: { status: "open" },
        raw: true,
      });
      return Array.isArray(data) ? data : [];
    } catch (e) {
      throw new Error(e);
    }
  }

  static async fetchInquiryDataByIp(ip) {
    try {
      const data = await CustomerInquiry.findAll({
        attributes: [
          "id",
          "customer_id",
          "tutor_id",
          "created_at",
          "name",
          "ip",
        ],
        where: { ip },
        raw: true,
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async saveCustomerInquiry(data) {
    try {
      const newResult = await CustomerInquiry.create({
        customer_id: data.customerId || null,
        tutor_id: data.tutorId,
        created_at: data.createAt,
        name: data.fullName,
        age: data.age || null,
        cellphone: data.cellphone || "",
        wechat_account: data.wechatAccNo || null,
        email: data.email || null,
        school: data.school || null,
        question: data.inquiry,
        ip: data.ip || null,
      });
      return newResult.id;
    } catch (e) {
      throw new Error(e);
    }
  }
}
module.exports = ConsultingDAO;
