const ClientServices = require("./services");
const { v4: uuidv4 } = require("uuid");
const lodash = require("lodash");
const TestResultService = require("../testResults/services");
const DimensionTestResultServices = require("../dimensionTest/resultServices");
const HollandTestResultService = require("../hollandTest/resultServices");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || typeof email !== "string") {
        res
          .status(400)
          .json({ success: false, message: "请输入正确的邮箱格式。" });
        return;
      }
      if (!password || typeof password !== "string") {
        res.status(400).json({ success: false, message: "请输入密码。" });
        return;
      }
      const foundUser = await ClientServices.getUserInfoByEmail(email);
      if (!foundUser) {
        res.status(404).json({ success: false, message: "该账号不存在。" });
        return;
      }
      const userData = new ClientServices(foundUser);
      const match = await ClientServices.comparePassword(
        password,
        foundUser.password.replace("$2y$", "$2a$"),
      );
      if (!match) {
        res.status(400).json({ success: false, message: "邮箱或密码不正确。" });
        return;
      }

      const newToken = await userData.generateJwtToken();

      res.json({
        success: true,
        message: "登录成功。",
        auth_token: newToken,
        data: userData.toJson(),
      });
    } catch (err) {
      next(err);
    }
  }

  static async fetchAllUsers(req, res, next) {
    try {
      const results = await ClientServices.getAllUsers();
      let i = 0;
      let data = [];
      while (i < results.length) {
        const resultObj = new ClientServices(results[i]);

        // Fill test results
        resultObj.mbtiResult = null;
        resultObj.hollandResult = null;
        const testResults = await TestResultService.getTestResultsByUser(
          resultObj.id,
        );
        let j = 0;
        let foundHolland = false;
        let foundMbti = false;
        while (j < testResults.length && (!foundHolland || !foundMbti)) {
          console.log(testResults[j]);
          if (testResults[j].title === "MBTI性格测试" && !foundMbti) {
            foundMbti = true;
            resultObj.mbtiResult = { date: testResults[j].create_date };
            resultObj.mbtiResult.code = new DimensionTestResultServices(
              await DimensionTestResultServices.fetchResultById(
                testResults[j].id,
              ),
            ).code;
          } else if (
            testResults[j].title === "霍兰德职业兴趣测试" &&
            !foundHolland
          ) {
            foundHolland = true;
            resultObj.hollandResult = { date: testResults[j].create_date };
            resultObj.hollandResult.code = new HollandTestResultService(
              await HollandTestResultService.fetchResultById(testResults[j].id),
            ).title;
          }
          j += 1;
        }
        // End fill test results

        data.push(resultObj);
        i += 1;
      }
      res.json({
        success: true,
        message: "",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async fetchUser(req, res, next) {
    try {
      const { user } = req;
      const userData = new ClientServices(user);
      res.json({ success: true, message: "", data: userData.toJson() });
    } catch (err) {
      next(err);
    }
  }

  static async verifyUserEmail(req, res, next) {
    try {
      const { user, body } = req;
      const userData = new ClientServices(user);
      if (!body || !body.token) {
        res
          .status(400)
          .json({ success: false, message: "请求无法被处理，必要字段缺失。" });
        return;
      }
      if (userData.emailVerified) {
        res.status(400).json({ success: false, message: "该用户验证过邮箱。" });
        return;
      }
      if (userData.temporaryLink !== body.token) {
        res.status(400).json({
          success: false,
          message: "请求无法被处理，必要信息不匹配。",
        });
        return;
      }
      await ClientServices.verifyEmail(user.id);
      res.json({ success: true, message: "您的邮箱已经成功被验证。" });
    } catch (err) {
      next(err);
    }
  }

  static async reigsterByEmail(req, res, next) {
    try {
      const { body } = req;
      if (!body || !body.email || !body.password) {
        res
          .status(400)
          .json({ success: false, message: "请求无法被处理，必要字段缺失。" });
        return;
      }

      const foundUser = await ClientServices.getUserInfoByEmail(body.email);
      if (foundUser) {
        res
          .status(400)
          .json({ success: false, message: "该账号已被存在，请直接登录。" });
        return;
      }
      const uniqueId = uuidv4();
      const newUser = await ClientServices.saveEmailUser({
        ...body,
        temporary_link: uniqueId,
        status: "open",
      });
      const userData = new ClientServices(newUser);
      const newToken = await userData.generateJwtToken();
      const confirmationEmailStatus =
        await ClientServices.sendConfirmEmailToUser(body.email, uniqueId);
      res.json({
        success: true,
        message: `邮箱注册成功！${
          confirmationEmailStatus.success ? confirmationEmailStatus.message : ""
        }`,
        auth_token: newToken,
        data: userData.toJson(),
      });
    } catch (err) {
      next(err);
    }
  }

  static async authWechatUser(req, res, next) {
    try {
      const { body } = req;
      if (!body || !body.code) {
        res
          .status(400)
          .json({ success: false, message: "请求无法被处理，必要字段缺失。" });
        return;
      }
      let userData = null;
      let newToken = null;
      const user = await ClientServices.authWechatByCode(
        body.code,
        body.isWechatBrowser,
      );
      userData = new ClientServices(user);
      newToken = await userData.generateJwtToken();
      res.json({
        success: true,
        message: "微信认证登录成功！",
        auth_token: newToken,
        data: userData.toJson(),
      });
    } catch (err) {
      next(err);
    }
  }

  static async authByWechatFromPc(req, res, next) {
    try {
      const { body } = req;
      if (!body) {
        res
          .status(400)
          .json({ success: false, message: "请求无法被处理，必要字段缺失。" });
        return;
      }
      let userData = null;
      let newToken = null;
      const foundUser = await ClientServices.getUserInfoByUnionId(body.unionid);
      if (foundUser) {
        userData = new ClientServices(foundUser);
        newToken = await userData.generateJwtToken();
      } else {
        const newUser = await ClientServices.saveUser({
          ...body,
          status: "open",
        });
        userData = new ClientServices(newUser);
        newToken = await userData.generateJwtToken();
      }
      res.json({
        success: true,
        message: "微信认证登录成功！",
        auth_token: newToken,
        data: userData.toJson(),
      });
    } catch (err) {
      next(err);
    }
  }

  static async sendAuthCodeToPhone(req, res, next) {
    try {
      const { body } = req;
      if (!body || !body.phone) {
        res
          .status(400)
          .json({ success: false, message: "请求无法被处理，必要字段缺失。" });
        return;
      }
      const isSend = await ClientServices.handleSmsAuth(body.phone);
      res.json({
        success: isSend,
        message: isSend ? "短信已发送。" : "短信未能发送",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  }

  static async authByPhone(req, res, next) {
    try {
      const { body } = req;
      if (!body || !body.phone || !body.passcode) {
        res
          .status(400)
          .json({ success: false, message: "请求无法被处理，必要字段缺失。" });
        return;
      }
      const result = await ClientServices.authCustomerByPhone(
        body.phone,
        body.passcode,
      );
      if (result === "not found") {
        res.status(500).json({
          success: false,
          message: "无法验证手机，请重试获取验证码。",
        });
      } else if (result === "invalid code") {
        res.status(400).json({
          success: false,
          message: "您输入的验证码有误，请重新输入。",
        });
      } else if (result === "expired") {
        res.status(400).json({
          success: false,
          message: "验证码已过期。",
        });
      } else {
        const userData = new ClientServices(result);
        const newToken = await userData.generateJwtToken();
        res.json({
          success: true,
          message: "您的手机号已经验证成功。",
          data: userData,
          auth_token: newToken,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async saveInquiry(req, res, next) {
    try {
      const { body } = req;
      if (
        !body ||
        !body.cellphone ||
        !body.fullName ||
        !body.email ||
        !body.city ||
        !body.school
      ) {
        res
          .status(400)
          .json({ success: false, message: "请求无法被处理，必要字段缺失。" });
        return;
      }

      const result = await ClientServices.saveInquiry(body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
