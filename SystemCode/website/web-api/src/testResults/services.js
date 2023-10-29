const TestResultDAO = require("./dao");

class TestResultService {
  constructor({ id, create_date, title } = {}) {
    this.id = id;
    this.title = title;
    this.createDate = create_date;
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      createDate: this.createDate,
    };
  }

  static async getTestResultsByUser(userId) {
    return await TestResultDAO.getResultsByUserId(userId);
  }
}
module.exports = TestResultService;
