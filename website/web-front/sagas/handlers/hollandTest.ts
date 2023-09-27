import { call, put, takeEvery } from "redux-saga/effects";

import {
  OnEditAnswer,
  OnEditAnswerAndUserInfo,
} from "../../features/tests/holland.d";
import {
  receiveHollandTestResponse,
  receiveHollandTestResult,
  receiveHollandTestingData,
} from "../../features/tests/hollandTestSlice";
import { CONNECTION_FAILURE } from "../../helper/constants";
import {
  requestToFetchHollandTestResult,
  requestToFetchTestingByTitle,
  requestToSubmitHollandTest,
  requestToSubmitHollandTestAndSendEmail,
} from "../../services/test";
import { sagaActions } from "../actions";
import { ResponseData } from "../effect";

function* fetchTesting(action: { type: string; payload: { title: string } }) {
  try {
    const result: ResponseData = yield call(
      requestToFetchTestingByTitle,
      action.payload.title,
    );
    yield put(receiveHollandTestingData(result));
  } catch (e) {
    yield put(receiveHollandTestingData(CONNECTION_FAILURE));
  }
}

function* submitHollandTest(action: { type: string; payload: OnEditAnswer[] }) {
  try {
    const result: ResponseData = yield call(
      requestToSubmitHollandTest,
      action.payload,
    );
    yield put(receiveHollandTestResponse(result));
  } catch (e) {
    yield put(receiveHollandTestResponse(CONNECTION_FAILURE));
  }
}

function* submitHollandTestAndSendEmail(action: {
  type: string;
  payload: OnEditAnswerAndUserInfo;
}) {
  try {
    const result: ResponseData = yield call(
      requestToSubmitHollandTestAndSendEmail,
      action.payload,
    );
    yield put(receiveHollandTestResponse(result));
  } catch (e) {
    yield put(receiveHollandTestResponse(CONNECTION_FAILURE));
  }
}

function* fetchHollandTestResultByTestId(action: {
  type: string;
  payload: { testId: number };
}) {
  try {
    const result: ResponseData = yield call(
      requestToFetchHollandTestResult,
      action.payload.testId,
    );
    yield put(receiveHollandTestResult(result));
  } catch (e) {
    yield put(receiveHollandTestResult(CONNECTION_FAILURE));
  }
}

function* watchFetchTestAsync() {
  yield takeEvery(sagaActions.FETCH_HOLLAND_TEST_DATA, fetchTesting);
  yield takeEvery(sagaActions.SUBMIT_HOLLAND_TEST, submitHollandTest);
  yield takeEvery(
    sagaActions.SUBMIT_HOLLAND_TEST_AND_SEND_EMAIL,
    submitHollandTestAndSendEmail,
  );
  yield takeEvery(
    sagaActions.FETCH_HOLLAND_TEST_RESULT,
    fetchHollandTestResultByTestId,
  );
}

export default [watchFetchTestAsync()];
