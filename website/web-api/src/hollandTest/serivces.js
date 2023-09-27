const HollandTestDAO = require("./dao");
const logger = require("../../logger/index");
const transporter = require("../../helpers/transporter");

class HollandTestService {
  constructor({ title, details } = {}) {
    this.title = title;
    this.details = details;
  }

  static async fetchTestingData() {
    return await HollandTestDAO.fetchTestingData();
  }

  static async saveResultAndAnswers(formData, user) {
    //fetch test by title
    const response = {
      success: false,
      data: null,
      message: "保存测试结果未成功",
    };

    //fetch test profile
    const foundTest = await HollandTestDAO.getTestBasicInfoByTitle();
    if (!foundTest) {
      loggers.warn(`Failed to fetch test by title 霍兰德职业兴趣测试`);
      return response;
    }

    //fetch topics of test
    const topics = await HollandTestDAO.getTopics();
    if (!Array.isArray(topics)) {
      logger.warn(
        "test service / saveQuestionAnswersByTest : no available topics were found.",
      );
      return response;
    }

    //get number of questions, and compare with the submission form items
    const numberOfQuestions =
      await HollandTestDAO.getNumberOfQuestionsByTestAndStatus();
    if (numberOfQuestions !== formData.length) {
      logger.warn(
        `test service / saveQuestionAnswersByTest : formdata's length (${formData.length}) doesn't match available questions ${numberOfQuestions}.`,
      );
      return response;
    }
    return await HollandTestDAO.saveResultAndAnswers(
      formData,
      user.id,
      foundTest.id,
      topics,
    );
  }

  static async sendEmailToManager(
    userName,
    age,
    phoneNumber,
    source,
    reason,
    resultId,
  ) {
    //这里不用传参数，先写死
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var mytime = date.toLocaleTimeString(); //获取当前时间
    var time = year + "-" + month + "-" + day + " " + mytime;

    const html = `<div style='width: 100%; padding-top: 30px;text-align: center;'>
      <h2>新用户完成测试</h2>
      <h3>用户名:${userName}</h3>
      <div>测试时间:${time}</div>
      <div>测试结果链接:${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/tests/holland-test/result/${resultId}</div>
      <div>年龄:${age}</div>
      <div>手机号:${phoneNumber}</div>
      <div>我目前:${reason}</div>
      <div>从哪里知道我们:${source}</div>
      </div>`;
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "contact@suitntie.cn", // sender address
      // to: "tim.zhao@suitntie.cn, fangqian@suitntie.cn", // list of receivers
      to: "lyyleo2001@gmail.com",
      subject: "适途咨询 - 新用户 新用户完成测试", // Subject line
      text: html, // plain text body
      html, // html body
    });

    return {
      success: info.messageId ? true : false,
      message: info.messageId ? "邮件已经发出" : "无法发送",
    };
  }
}

module.exports = HollandTestService;
