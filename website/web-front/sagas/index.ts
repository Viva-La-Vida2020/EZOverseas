import { all, call, put, takeEvery } from "redux-saga/effects";

import consultingWatchers from "./handlers/consult";
import dimensionTestWatchers from "./handlers/dimensionTest";
import hollandTestWatchers from "./handlers/hollandTest";
import homeWatchers from "./handlers/home";
import headerWatchers from "./handlers/nav";
import programWatchers from "./handlers/program";
import rankingWatchers from "./handlers/ranking";
import userWatchers from "./handlers/user";

export default function* rootSaga() {
  yield all([
    ...homeWatchers,
    ...headerWatchers,
    ...userWatchers,
    ...programWatchers,
    ...hollandTestWatchers,
    ...dimensionTestWatchers,
    ...consultingWatchers,
    ...rankingWatchers,
  ]);
}
