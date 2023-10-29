const DimensionTestDAO = require("./dao");
const logger = require("../../logger/index");
const lodash = require("lodash");
const transporter = require("../../helpers/transporter");

class DimensionTestServices {
  constructor({ title, topics, questions, answers, questionTypes } = {}) {
    this.title = title;
    this.topics = topics;
    this.questions = questions;
    this.answers = answers;
    this.questionTypes = questionTypes;
  }

  toJson() {
    return {
      title: this.title,
      topics: this.topics,
      details: this.questionTypes.map((item) => {
        return {
          id: item.id,
          name: item.name,
          questionsPerPage: item.questions_per_page,
          questions: lodash.shuffle(
            this.questions
              .filter((q) => q.type_id === item.id)
              .map((i) => {
                return {
                  id: i.id,
                  subject: i.subject,
                  topicId: i.topic_id,
                  typeId: i.typeId,
                  answers: this.answers
                    .filter((a) => a.question_id === i.id)
                    .map((a) => {
                      return {
                        id: a.id,
                        questionId: a.question_id,
                        subject: a.subject,
                        dimensionId: a.dimension_id,
                      };
                    }),
                };
              }),
          ),
        };
      }),
      totalQuestions: this.questions.length,
    };
  }

  static async fetchTestingData() {
    return await DimensionTestDAO.fetchTestingData();
  }

  static async saveResultAndAnswers(formData, user) {
    return await DimensionTestDAO.saveResultAndAnswers(formData, user.id);
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
      <div>测试结果链接:${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/tests/dimension-test/result/${resultId}</div>
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
      subject: "EZO咨询 - 新用户 新用户完成测试", // Subject line
      text: html, // plain text body
      html, // html body
    });
    return {
      success: info.messageId ? true : false,
      message: info.messageId ? "邮件已经发出" : "无法发送",
    };
  }
}

module.exports = DimensionTestServices;
