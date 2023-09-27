const ProgramDAO = require("./dao");

class ProgramService {
  static async fetchProgramOptions() {
    return await ProgramDAO.fetchProgramOptions();
  }

  static async fetchProgramByTitle(title) {
    return await ProgramDAO.getProgramByTitle(title);
  }
}
module.exports = ProgramService;
