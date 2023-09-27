const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ClientsDAO = require("./dao");
const moment = require("moment");
const transporter = require("../../helpers/transporter");
const nodemailer = require("nodemailer");
const tencentcloud = require("tencentcloud-sdk-nodejs");
const fetch = require("node-fetch");

class Client {
  constructor({
    id,
    full_name,
    age,
    is_study_aboard,
    how_know,
    email,
    phone,
    nick_name,
    sex,
    city,
    province,
    country,
    headImg,
    temporary_link,
    email_verified,
    ip,
  } = {}) {
    this.id = id;
    this.fullName = full_name;
    this.age = age;
    this.studyAboard = is_study_aboard;
    this.knewSuitntieBy = how_know;
    this.email = email;
    this.phone = phone;
    this.nickName = nick_name;
    this.sex = sex;
    this.city = city;
    this.province = province;
    this.country = country;
    this.headImg = headImg;
    this.temporaryLink = temporary_link;
    this.emailVerified = email_verified;
    this.ip = ip;
  }

  static async comparePassword(pwd, foundUserPwd) {
    return await bcrypt.compare(pwd, foundUserPwd.replace("$2y$", "$2a$"));
  }

  toJson() {
    return {
      id: this.id,
      fullName: this.fullName,
      age: this.age,
      studyAboard: this.studyAboard,
      knewSuitntieBy: this.knewSuitntieBy,
      email: this.email,
      phone: this.phone,
      nickName: this.nickName,
      sex: this.sex,
      city: this.city,
      province: this.province,
      country: this.country,
      headImg: this.headImg,
      emailVerified: !!this.emailVerified,
      ip: this.ip,
    };
  }

  static async decoded(userJwt) {
    return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
      if (error) {
        return { error };
      }
      return res;
    });
  }

  async generateJwtToken() {
    return jwt.sign(
      {
        //exp: Math.floor(Date.now() / 1000) + 30 * 60,
        ...this.toJson(),
      },
      process.env.SECRET_KEY,
      { expiresIn: "14d" },
    );
  }

  static async verifyEmail(userId) {
    return await ClientsDAO.verifyEmailByToken(userId);
  }

  static async authWechatUser(unionId, userWechatInfo) {
    const foundUser = await this.getUserInfoByUnionId(unionId);
    if (foundUser) {
      return foundUser;
    }
    const userData = {
      nick_name: userWechatInfo.nickname || "",
      sex: userWechatInfo.sex || "",
      city: userWechatInfo.city || "",
      province: userWechatInfo.province || "",
      country: userWechatInfo.country || "",
      headImg: userWechatInfo.headimgurl || "",
      unionid: unionId,
      status: "open",
      date_time: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    return await this.saveUser(userData);
  }

  static async saveEmailUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 8);
    return await ClientsDAO.saveUser({
      ...data,
      email: data.email,
      password: hashedPassword,
    });
  }

  static async saveUser(data) {
    return await ClientsDAO.saveUser(data);
  }

  static async getUserInfoByEmail(email) {
    return ClientsDAO.fetchClientByEmail(email);
  }

  static async getAllUsers() {
    return ClientsDAO.fetchAllClients();
  }

  static async getUserInfoByPhone(phone) {
    return ClientsDAO.fetchClientByPhone(phone);
  }

  static async getUserInfoByUnionId(unionId) {
    return ClientsDAO.fetchClientByUnionId(unionId);
  }

  static async getUserInfoById(id) {
    return ClientsDAO.fetchClientById(id);
  }

  static async sendConfirmEmailToUser(email, token) {
    const html = `<div style='width: 100%; padding-top: 30px;text-align: center;'>
      <h2>适途咨询</h2>
      <h3>用户注册 - 验证邮箱</h3>
          <h4>请点击<a href="${process.env.WEB_HOST_URL}/account/auth/email?email=${email}&token=${token}">链接</a>验证</h4>
      </div>`;
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "contact@suitntie.cn", // sender address
      to: email, // list of receivers
      subject: "适途咨询 - 新用户 验证邮箱", // Subject line
      text: html, // plain text body
      html, // html body
    });

    //console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return {
      success: info.messageId ? true : false,
      message: info.messageId ? "邮件已经发出" : "无法发送",
    };
  }

  static async handleSmsAuth(phone) {
    //generate 6 digits code
    const code = Math.floor(100000 + Math.random() * 900000);
    const foundExistRecord = await ClientsDAO.findPhoneAndCode(phone);
    if (
      foundExistRecord &&
      moment(foundExistRecord.createdAt).add(60, "s") > moment()
    ) {
      return false;
    }
    await ClientsDAO.savePhoneAndCode(phone, code);
    const smsClient = tencentcloud.sms.v20210111.Client;
    const smsClientInstance = new smsClient({
      credential: {
        /* 必填：腾讯云账户密钥对secretId，secretKey。
         * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
         * 你也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
         * 以免泄露密钥对危及你的财产安全。
         * SecretId、SecretKey 查询: https://console.cloud.tencent.com/cam/capi */
        secretId: process.env.SMS_SECRET_ID,
        secretKey: process.env.SMS_SECRET_KEY,
      },
      /* 必填：地域信息，可以直接填写字符串ap-guangzhou，支持的地域列表参考 https://cloud.tencent.com/document/api/382/52071#.E5.9C.B0.E5.9F.9F.E5.88.97.E8.A1.A8 */
      region: "ap-guangzhou",
      /* 非必填:
       * 客户端配置对象，可以指定超时时间等配置 */
      profile: {
        /* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
        signMethod: "HmacSHA256",
        httpProfile: {
          /* SDK默认使用POST方法。
           * 如果你一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
          reqMethod: "POST",
          /* SDK有默认的超时时间，非必要请不要进行调整
           * 如有需要请在代码中查阅以获取最新的默认值 */
          reqTimeout: 30,
          /**
           * 指定接入地域域名，默认就近地域接入域名为 sms.tencentcloudapi.com ，也支持指定地域域名访问，例如广州地域的域名为 sms.ap-guangzhou.tencentcloudapi.com
           */
          endpoint: "sms.tencentcloudapi.com",
        },
      },
    });

    /* 请求参数，根据调用的接口和实际情况，可以进一步设置请求参数
     * 属性可能是基本类型，也可能引用了另一个数据结构
     * 推荐使用IDE进行开发，可以方便的跳转查阅各个接口和数据结构的文档说明 */
    const params = {
      /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
      SmsSdkAppId: "1400383321",
      /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
      SignName: "suitntie",
      /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
      ExtendCode: "0",
      /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
      SenderId: "",
      /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
      SessionContext: "",
      /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
       * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
      PhoneNumberSet: [`+86${phone}`],
      /* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
      TemplateId: "629111",
      /* 模板参数: 若无模板参数，则设置为空*/
      TemplateParamSet: [code, "3"],
    };
    // 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
    const result = await smsClientInstance.SendSms(
      params,
      function (err, response) {
        // 请求异常返回，打印异常信息
        if (err) {
          console.log(err);
          return err;
        }
        // 请求正常返回，打印response对象
        return response;
      },
    );
    //console.log("sms sending result : ", result);
    /* result sample
     {
      SendStatusSet: [
        {
          SerialNo: '2433:378708833716466049338383663',
          PhoneNumber: '+8613141036635',
          Fee: 1,
          SessionContext: '',
          Code: 'Ok',
          Message: 'send success',
          IsoCode: 'CN'
        }
      ],
      RequestId: 'e2880cb8-8dac-4bb5-b750-48190e03a4c5'
    } */

    return (
      Array.isArray(result.SendStatusSet) &&
      result.SendStatusSet.length > 0 &&
      result.SendStatusSet[0].Code === "Ok"
    );
  }

  static async authCustomerByPhone(phone, code) {
    const today = moment().format("YYYY-MM-DD HH:mm:ss");
    const foundAuthRecord = await ClientsDAO.findPhoneAndCode(phone);
    if (!foundAuthRecord) {
      return "not found";
    } else if (foundAuthRecord.code.toString() !== code.toString()) {
      return "invalid code";
    } else if (moment(foundAuthRecord.expireAt) < moment()) {
      return "expired";
    } else {
      await ClientsDAO.updatePhoneAuthRecord(phone);
      const foundExistCustomerByPhone = await ClientsDAO.fetchClientByPhone(
        phone,
      );
      if (foundExistCustomerByPhone) {
        return foundExistCustomerByPhone;
      }
      return await ClientsDAO.saveUser({
        phone,
        date_time: today,
        status: "open",
      });
    }
  }

  static async saveInquiry(data) {
    const foundAllExistInquires = await ClientsDAO.findInquriyByEmailOrPhone(
      data.cellphone,
      data.email,
    );
    const today = moment().format("YYYY-MM-DD");
    if (
      Array.isArray(foundAllExistInquires) &&
      foundAllExistInquires.filter(
        (item) =>
          item.createdAt &&
          moment(item.createdAt).format("YYYY-MM-DD") === today,
      ).length > 2
    ) {
      return {
        success: false,
        message: "您当日发送的申请数已经到达上限。",
        data: null,
      };
    }
    await ClientsDAO.saveInquiry(data);

    // Send email
    // TODO templatize and modularize
    const html = `<div style='width: 100%; padding-top: 30px;text-align: center;'>
    <h2>适途咨询 - 新用户咨询请求</h2>
        姓名:${data.fullName}<br>
        手机号:${data.cellphone}<br>
        邮箱:${data.email}<br>
        微信号:${data.wechatAccNo}<br>
        城市:${data.city}<br>
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

    return {
      success: true,
      message: "已收到您的咨询信息，我们会尽快安排联系您。",
    };
  }

  static async authWechatByCode(code, isMobile) {
    const appId = isMobile
      ? process.env.WECHAT_MOBILE_APP_ID
      : process.env.WECHAT_APP_ID;
    const secret = isMobile
      ? process.env.WECHAT_MOBILE_SECRET
      : process.env.WECHAT_SECRET;
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${secret}&code=${code}&grant_type=authorization_code`;
    const responseOfAuthInfo = await fetch(url);
    const authInfo = await responseOfAuthInfo.json();
    const url2 = `https://api.weixin.qq.com/sns/userinfo?access_token=${authInfo.access_token}&openid=${authInfo.openid}`;
    const responseOfUserInfo = await fetch(url2);
    const userInfo = await responseOfUserInfo.json();
    const foundUser = await this.getUserInfoByUnionId(userInfo.unionid);
    if (!foundUser) {
      return await this.saveUser({ ...userInfo, status: "open" });
    } else {
      return foundUser;
    }
  }
}

module.exports = Client;
