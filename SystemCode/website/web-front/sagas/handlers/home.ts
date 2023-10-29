import { call, put, takeEvery } from "redux-saga/effects";

import { receiveSliders } from "../../features/home/homeSlice";
import { requestToFetchHomeSliders } from "../../services/home";
import { sagaActions } from "../actions";

function* fetchHomeSliders() {
  try {
    const data: Array<any> = yield call(requestToFetchHomeSliders);
    yield put(receiveSliders(data));
  } catch (e) {
    yield put(receiveSliders([]));
  }
}

function* watchFetchHomeSlidersAsync() {
  yield takeEvery(sagaActions.FETCH_HOME_SLIDERS, fetchHomeSliders);
}

export default [watchFetchHomeSlidersAsync()];
