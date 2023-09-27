const ConsultingDAO = require("./dao");
const moment = require("moment");
const transporter = require("../../helpers/transporter");

class ConsultingService {
  constructor({
    id,
    name,
    nick_name,
    education,
    introduction,
    thumbnail,
    status,
    details,
  } = {}) {
    this.id = id;
    this.fullName = name;
    this.nickName = nick_name;
    this.educationLevel = education;
    this.introduction = introduction;
    this.thumbnail = thumbnail;
    this.status = status;
    this.details = details;
  }

  toJson() {
    return {
      id: this.id,
      fullName: this.fullName,
      nickName: this.nickName,
      educationLevel: this.educationLevel,
      introduction: this.introduction,
      thumbnail: this.thumbnail,
      details: Array.isArray(this.details)
        ? this.details.map((item) => {
            return {
              tutorId: item.tutor_id,
              programId: item.program_id,
              education: item.education,
              schoolId: item.school_id,
              scholarship: item["program.scholarship"],
              programRankingBy: item["program.ranking_by"],
              programRankingName: item["program.nameForRanking"],
              programTitle: item["program.programTitle"],
              schoolRegionId: item["school.region"],
              schoolName: item["school.schoolName"],
            };
          })
        : [],
    };
  }

  static async getAllConsoultants() {
    return await ConsultingDAO.getAllConsultants();
  }

  static async getAllRegions() {
    return await ConsultingDAO.fetchRegions();
  }

  static async findInquiryByIp(ip, tutorId) {
    const today = moment().format("YYYY-MM-DD");
    const foundInquires = await ConsultingDAO.fetchInquiryDataByIp(ip);
    if (
      foundInquires.find(
        (item) =>
          item.created_at &&
          moment(item.created_at).format("YYYY-MM-DD") === today &&
          tutorId &&
          item.tutor_id.toString() === tutorId.toString(),
      )
    ) {
      return true;
    }
    return false;
  }

  static async saveInquiryData(data) {
    // Send email before saing to db
    // TODO templatize and modularize
    const html = `<div style='width: 100%; padding-top: 30px;text-align: center;'>
    <h2>适途咨询 - 新用户导师咨询请求</h2>
        姓名:${data.fullName}<br>
        用户ID:${data.customerId}<br>
        年龄:${data.age}<br>
        邮箱:${data.email}<br>
        手机号:${data.cellphone}<br>
        微信号:${data.wechatAccNo}<br>
        导师ID:${data.tutorId}<br>
        所在学校:${data.school}<br>
        问题:${data.inquiry}<br>
    </div>`;
    let info = await transporter.sendMail({
      from: "contact@suitntie.cn", // sender address
      to: "contact@suitntie.cn", // list of receivers
      subject: "适途咨询 - 新用户咨询请求", // Subject line
      text: html, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Save to DB
    return await ConsultingDAO.saveCustomerInquiry(data);
  }
}
module.exports = ConsultingService;
