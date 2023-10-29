import { call, put, takeEvery } from "redux-saga/effects";

import {
  receiveError,
  receiveProgramRankingData,
  receiveRankingData,
  receiveSchoolProgramRankingData,
} from "../../features/ranking/rankingSlice";
import { StandardResponse } from "../../helper/commonTypes";
import { CONNECTION_FAILURE } from "../../helper/constants";
import {
  requestToFetchProgramRankingDataByNameForRanking,
  requestToFetchProgramRankingDataBySchoolName,
  requestToFetchRankingData,
} from "../../services/ranking";
import { sagaActions } from "../actions";

function* fetchRankingData() {
  try {
    const response: StandardResponse | null = yield call(
      requestToFetchRankingData,
    );
    if (!response || !response.success) {
      yield put(
        receiveError({
          status: response ? response.status : 500,
          message: response ? response.message : "无法连接服务器",
        }),
      );
      return;
    }
    yield put(receiveRankingData(response.data));
  } catch (e) {
    yield put(receiveError(CONNECTION_FAILURE));
  }
}

function* watchFetchRankingDataAsync() {
  yield takeEvery(sagaActions.FETCH_RANKING_DATA, fetchRankingData);
}

function* fetchProgramRankingDataByNameForRanking(action: {
  type: string;
  payload: {
    name: string;
  };
}) {
  try {
    const response: StandardResponse | null = yield call(
      requestToFetchProgramRankingDataByNameForRanking,
      action.payload,
    );
    if (!response || !response.success) {
      yield put(
        receiveError({
          status: response ? response.status : 500,
          message: response ? response.message : "无法连接服务器",
        }),
      );
      return;
    }
    yield put(receiveProgramRankingData(response.data));
  } catch (e) {
    yield put(receiveError(CONNECTION_FAILURE));
  }
}

function* watchFetchProgramRankingDataByNameForRankingAsync() {
  yield takeEvery(
    sagaActions.FETCH_PROGRAM_RANKING_DATA_BY_NAME_FOR_RANKING,
    fetchProgramRankingDataByNameForRanking,
  );
}

function* fetchProgramRankingDataBySchoolName(action: {
  type: string;
  payload: {
    name: string;
  };
}) {
  try {
    const response: StandardResponse | null = yield call(
      requestToFetchProgramRankingDataBySchoolName,
      action.payload,
    );
    if (!response || !response.success) {
      yield put(
        receiveError({
          status: response ? response.status : 500,
          message: response ? response.message : "无法连接服务器",
        }),
      );
      return;
    }
    yield put(receiveSchoolProgramRankingData(response.data));
  } catch (e) {
    yield put(receiveError(CONNECTION_FAILURE));
  }
}

function* watchFetchProgramRankingDataBySchoolNameAsync() {
  yield takeEvery(
    sagaActions.FETCH_PROGRAM_RANKING_DATA_BY_SCHOOL,
    fetchProgramRankingDataBySchoolName,
  );
}

export default [
  watchFetchRankingDataAsync(),
  watchFetchProgramRankingDataByNameForRankingAsync(),
  watchFetchProgramRankingDataBySchoolNameAsync(),
];
