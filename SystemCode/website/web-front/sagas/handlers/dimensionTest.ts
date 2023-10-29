import { call, put, takeEvery } from "redux-saga/effects";

import {
  receiveDimensionResultResponse,
  receiveDimensionTestResult,
  receiveTestingData,
} from "../../features/tests/dimensionTestSlice";
import {
  OnEditAnswer,
  OnEditAnswerAndUserInfo,
} from "../../features/tests/holland.d";
import { CONNECTION_FAILURE } from "../../helper/constants";
import {
  requestToFetchDimensionTestResult,
  requestToFetchTestingByTitle,
  requestToSubmitDimensionTest,
  requestToSubmitDimensionTestAndSendEmail,
} from "../../services/test";
import { sagaActions } from "../actions";
import { ResponseData } from "../effect";

function* fetchTestingData(action: {
  type: string;
  payload: { title: string };
}) {
  try {
    const result: ResponseData = yield call(
      requestToFetchTestingByTitle,
      action.payload.title,
    );
    yield put(receiveTestingData(result));
  } catch (e) {
    yield put(receiveTestingData(CONNECTION_FAILURE));
  }
}

function* submitDimensionTest(action: {
  type: string;
  payload: OnEditAnswer[];
}) {
  try {
    const result: ResponseData = yield call(
      requestToSubmitDimensionTest,
      action.payload,
    );
    yield put(receiveDimensionResultResponse(result));
  } catch (e) {
    yield put(receiveDimensionResultResponse(CONNECTION_FAILURE));
  }
}

function* submitDimensionTestAndSendEmail(action: {
  type: string;
  payload: OnEditAnswerAndUserInfo;
}) {
  try {
    const result: ResponseData = yield call(
      requestToSubmitDimensionTestAndSendEmail,
      action.payload, //这里不用改，controller里会根据req的内容自己找子成员
    );
    yield put(receiveDimensionResultResponse(result));
  } catch (e) {
    yield put(receiveDimensionResultResponse(CONNECTION_FAILURE));
  }
}

function* fetchDimensionTestResultByTestId(action: {
  type: string;
  payload: { testId: number };
}) {
  try {
    const result: ResponseData = yield call(
      requestToFetchDimensionTestResult,
      action.payload.testId,
    );
    yield put(receiveDimensionTestResult(result));
  } catch (e) {
    receiveDimensionTestResult(CONNECTION_FAILURE);
  }
}

function* watchFetchTestAsync() {
  yield takeEvery(sagaActions.FETCH_DIMENSION_TEST_DATA, fetchTestingData);
  yield takeEvery(sagaActions.SUBMIT_DIMENSION_TEST, submitDimensionTest);
  yield takeEvery(
    sagaActions.SUBMIT_DIMENSION_TEST_AND_SEND_EMAIL,
    submitDimensionTestAndSendEmail,
  );
  yield takeEvery(
    sagaActions.FETCH_DIMENSION_TEST_RESULT,
    fetchDimensionTestResultByTestId,
  );
}

export default [watchFetchTestAsync()];
