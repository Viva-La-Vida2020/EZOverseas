const ProgramBookmarkDAO = require("./dao");

class ProgramBookmarkService {
  constructor({
    userId,
    programBookmarkId,
    programId,
    programTitle,
    programDescription,
    createdTime,
  } = {}) {
    this.userId = userId;
    this.programBookmarkId = programBookmarkId;
    this.programTitle = programTitle;
    this.programId = programId;
    this.programDescription = programDescription;
    this.createdTime = createdTime;
  }

  toJson() {
    return {
      userId: this.userId,
      programBookmarkId: this.programBookmarkId,
      programId: this.programId,
      programTitle: this.programTitle,
      programDescription: this.programDescription,
      createdTime: this.createdTime,
    };
  }

  static async getProgramBookmarksByUserId(userId) {
    return await ProgramBookmarkDAO.getProgramBookmarksByUserId(userId);
  }

  static async createProgramBookmarkByUserId(userId, data) {
    return await ProgramBookmarkDAO.createProgramBookmarkByUserId(userId, data);
  }

  static async deleteProgramBookmarkByUserId(userId, programId) {
    return await ProgramBookmarkDAO.deleteProgramBookmarkByUserId(
      userId,
      programId,
    );
  }
}
module.exports = ProgramBookmarkService;
