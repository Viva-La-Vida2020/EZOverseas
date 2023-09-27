const express = require("express");
const router = express.Router();
const passport = require("passport");
const ProgramController = require("../src/program/controllers");
const UserController = require("../src/user/controllers");
const HollandTestController = require("../src/hollandTest/controllers");
const DimensionTestController = require("../src/dimensionTest/controllers");
const ConsultingController = require("../src/consulting/controllers");
const RankingController = require("../src/ranking/controllers");
const TestResultsController = require("../src/testResults/controllers");
const ProgramBookmarksController = require("../src/programBookmarks/controllers");

router.get("/user/all", UserController.fetchAllUsers);
router.get("/programs/all", ProgramController.getProgramOptions);
router.post("/user/login/email", UserController.login);
router.post("/user/signup/email", UserController.reigsterByEmail);
router.post("/user/login/wechat", UserController.authWechatUser);
router.post("/user/login/sendSms", UserController.sendAuthCodeToPhone);
router.post("/user/login/phone", UserController.authByPhone);
router.put(
  "/user/email/verify",
  passport.authenticate("jwt", { session: false }),
  UserController.verifyUserEmail,
);
router.get(
  "/user/currentUser",
  passport.authenticate("jwt", { session: false }),
  UserController.fetchUser,
);
router.get(
  "/user/test/results",
  passport.authenticate("jwt", { session: false }),
  TestResultsController.fetchUserResults,
);
router.get(
  "/user/test/results_by_id/:id",
  passport.authenticate("jwt", { session: false }),
  TestResultsController.fetchUserResultsById,
);
router.get(
  "/user/program_bookmarks",
  passport.authenticate("jwt", { session: false }),
  ProgramBookmarksController.fetchUserProgramBookmarks,
);
router.post(
  "/user/program_bookmarks",
  passport.authenticate("jwt", { session: false }),
  ProgramBookmarksController.createUserProgramBookmark,
);
router.delete(
  "/user/program_bookmarks/:bookmarkId",
  passport.authenticate("jwt", { session: false }),
  ProgramBookmarksController.deleteUserProgramBookmark,
);
router.get("/programs/:title", ProgramController.getProgramDetailsByTitle);
//holland-test routers
router.get(
  "/test/holland-test",
  passport.authenticate("jwt", { session: false }),
  HollandTestController.getTestData,
);
router.post(
  "/test/holland-test",
  passport.authenticate("jwt", { session: false }),
  HollandTestController.saveTestResult,
);
router.post(
  "/test/holland-test-and-send-email",
  passport.authenticate("jwt", { session: false }),
  HollandTestController.saveTestResultAndSendEmail,
);
router.get(
  "/test/holland-test/result/:id",
  passport.authenticate("jwt", { session: false }),
  HollandTestController.getHollandTestResultById,
);
//dimension-test routers
router.get(
  "/test/dimension-test",
  passport.authenticate("jwt", { session: false }),
  DimensionTestController.getTestData,
);
router.post(
  "/test/dimension-test",
  passport.authenticate("jwt", { session: false }),
  DimensionTestController.saveTestResult,
);
router.post(
  "/test/dimension-test-and-send-email",
  passport.authenticate("jwt", { session: false }),
  DimensionTestController.saveTestResultAndSendEmail,
);
router.get(
  "/test/dimension-test/result/:id",
  passport.authenticate("jwt", { session: false }),
  DimensionTestController.getDimensionTestResultById,
);
router.get("/consulting", ConsultingController.fetchAll);
router.get("/ranking", RankingController.fetchAll);
router.get(
  "/ranking/program_ranking",
  RankingController.fetchProgramRankingByNameForRanking,
);
router.get(
  "/ranking/program_ranking/:schoolName",
  RankingController.fetchProgramRankingBySchoolName,
);
router.post("/consulting/inquiry", ConsultingController.saveInquiry);
router.post("/user/inquiry", UserController.saveInquiry);
module.exports = router;
