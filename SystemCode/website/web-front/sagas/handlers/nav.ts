import { call, put, takeEvery } from "redux-saga/effects";

import { receiveSliders } from "../../features/home/homeSlice";
import { requestToFetchProgramsForHeader } from "../../services/nav";
import { sagaActions } from "../actions";

function* fetchProgramsForHeader() {
  try {
    const data: Array<any> = yield call(requestToFetchProgramsForHeader);
    yield put(receiveSliders(data));
  } catch (e) {
    yield put(receiveSliders([]));
  }
}

function* watchFetchProgramsForHeaderAsync() {
  yield takeEvery(sagaActions.FETCH_HEADER_PROGRAMS, fetchProgramsForHeader);
}

export default [watchFetchProgramsForHeaderAsync()];
