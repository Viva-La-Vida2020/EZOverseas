import { call, put, takeEvery } from "redux-saga/effects";

import { BookedProgram } from "../../features/programs/program.d";
import {
  receiveProgramBookingResponse,
  receiveProgramDetails,
  receivePrograms,
} from "../../features/programs/programSlice";
import { CONNECTION_FAILURE } from "../../helper/constants";
import {
  requestToDeleteProgramBooking,
  requestToFetchAllPrograms,
  requestToFetchProgramByTitle,
  requestToSubmitProgramBooking,
} from "../../services/program";
import { sagaActions } from "../actions";
import { ResponseData } from "../effect";

function* fetchPrograms() {
  try {
    const data: Array<any> = yield call(requestToFetchAllPrograms);
    yield put(receivePrograms(data));
  } catch (e) {
    yield put(receivePrograms(CONNECTION_FAILURE));
  }
}

function* fetchProgramDetailsByTitle(action: {
  type: string;
  payload: { title: string };
}) {
  try {
    const data: Array<any> = yield call(
      requestToFetchProgramByTitle,
      action.payload.title,
    );
    yield put(receiveProgramDetails(data));
  } catch (e) {
    yield put(receiveProgramDetails(CONNECTION_FAILURE));
  }
}

function* submitProgramBooking(action: {
  type: string;
  payload: BookedProgram[];
}) {
  try {
    const result: ResponseData = yield call(
      requestToSubmitProgramBooking,
      action.payload,
    );
    yield put(receiveProgramBookingResponse(result));
  } catch (e) {
    yield put(receiveProgramBookingResponse(CONNECTION_FAILURE));
  }
}

function* deleteProgramBooking(action: {
  type: string;
  payload: BookedProgram[];
}) {
  try {
    const result: ResponseData = yield call(
      requestToDeleteProgramBooking,
      action.payload,
    );
    yield put(receiveProgramBookingResponse(result));
  } catch (e) {
    yield put(receiveProgramBookingResponse(CONNECTION_FAILURE));
  }
}

function* watchFetchProgramsAsync() {
  yield takeEvery(sagaActions.SUBMIT_PROGRAM_BOOKING, submitProgramBooking);
  yield takeEvery(sagaActions.DELETE_PROGRAM_BOOKING, deleteProgramBooking);
  yield takeEvery(sagaActions.FETCH_PROGRAMS, fetchPrograms);
  yield takeEvery(
    sagaActions.FETCH_PROGRAM_DETAILS,
    fetchProgramDetailsByTitle,
  );
}

export default [watchFetchProgramsAsync()];
