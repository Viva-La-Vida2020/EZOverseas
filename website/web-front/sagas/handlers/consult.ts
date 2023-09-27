import { call, put, takeEvery } from "redux-saga/effects";

import { InquiryForm } from "../../features/consult/consult";
import {
  receiveConsultingData,
  receiveError,
  receiveInquiryResponse,
} from "../../features/consult/consultSlice";
import { StandardResponse } from "../../helper/commonTypes";
import { CONNECTION_FAILURE } from "../../helper/constants";
import {
  requestToFetchConsultingData,
  requestToSendInquiry,
} from "../../services/consult";
import { sagaActions } from "../actions";

function* fetchConsultingData() {
  try {
    const response: StandardResponse | null = yield call(
      requestToFetchConsultingData,
    );
    if (!response || !response.success) {
      yield put(receiveError(response));
      return;
    }
    yield put(receiveConsultingData(response));
  } catch (e) {
    yield put(
      receiveConsultingData({
        data: {
          consultants: [],
          regions: [],
          educationLevels: [],
        },
      }),
    );
  }
}

function* sendInquiry(action: { type: string; payload: InquiryForm }) {
  try {
    const response: StandardResponse | null = yield call(
      requestToSendInquiry,
      action.payload,
    );
    yield put(receiveInquiryResponse(response));
  } catch (e) {
    yield put(receiveInquiryResponse(CONNECTION_FAILURE));
  }
}

function* watchFetchConsultingDataAsync() {
  yield takeEvery(sagaActions.FETCH_CONSULTING_DATA, fetchConsultingData);
  yield takeEvery(sagaActions.SEND_CONSULTING_INQUIRY, sendInquiry);
}

export default [watchFetchConsultingDataAsync()];
