import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  receiveAllUsers,
  receiveGeneralInquiryResponse,
  receiveLoginError,
  receiveProgramBooking,
  receiveSignupResponse,
  receiveSmsSendingResponse,
  receiveTestResults,
  receiveUser,
  receiveUserError,
  receiveVerificationResponse,
  recevieAuthResponse,
} from "../../features/user/userSlice";
import { StandardResponse } from "../../helper/commonTypes";
import { CONNECTION_FAILURE } from "../../helper/constants";
import { EmailPasswordForm } from "../../layout/components/login/login";
import {
  requestToAuthByPhone,
  requestToAuthWechatOnAPI,
  requestToFetchAllUsers,
  requestToFetchUser,
  requestToFetchUserProgramBooking,
  requestToFetchUserTestResults,
  requestToFetchUserTestResultsById,
  requestToLoginByEmail,
  requestToRegisterByEmail,
  requestToSendGeneralInquiry,
  requestToSendSmsToPhone,
  requestToVerifyEmail,
} from "../../services/user";
import { sagaActions } from "../actions";
import {
  AllUsersResponse,
  EmailSignupResponse,
  GeneralInquiryForm,
  UserInfoResponse,
  UserLoginResponse,
  WechatAuthResponse,
} from "./user.d";

function* fetchAllUsers() {
  console.log("触发fetch");
  const response: AllUsersResponse = yield call(requestToFetchAllUsers);
  console.log("fetchAllUsers:", response);
  yield put(receiveAllUsers(response.data));
}

function* fetchUser() {
  try {
    const response: UserLoginResponse = yield call(requestToFetchUser);
    if (!response.success) {
      yield put(receiveUserError(response));
    } else {
      yield put(receiveUser(response.data));
    }
  } catch (e) {
    receiveUserError(CONNECTION_FAILURE);
  }
}

function* loginByEmail(action: { type: string; payload: EmailPasswordForm }) {
  try {
    const result: UserLoginResponse = yield call(
      requestToLoginByEmail,
      action.payload,
    );
    if (!result.success || !result.auth_token) {
      yield put(receiveLoginError(result));
    } else {
      yield localStorage.setItem("jwt", `Bearer ${result.auth_token}`);
      yield put(receiveUser(result.data));
    }
  } catch (e) {
    receiveLoginError(CONNECTION_FAILURE);
  }
}

function* registerByEmail(action: {
  type: string;
  payload: EmailPasswordForm;
}) {
  try {
    const result: EmailSignupResponse = yield call(
      requestToRegisterByEmail,
      action.payload,
    );
    if (result.auth_token) {
      localStorage.setItem("jwt", `Bearer ${result.auth_token}`);
    }
    yield put(receiveSignupResponse(result));
    yield put(receiveUser(result.data));
  } catch (e) {
    receiveSignupResponse(CONNECTION_FAILURE);
  }
}

function* fetchTestResults() {
  try {
    const result: StandardResponse | null = yield call(
      requestToFetchUserTestResults,
    );
    yield put(receiveTestResults(result));
  } catch (e) {
    receiveTestResults(null);
  }
}

function* fetchTestResultsById(action: {
  type: string;
  payload: { id: string };
}) {
  try {
    const result: StandardResponse | null = yield call(
      requestToFetchUserTestResultsById,
      action.payload.id
    );
    yield put(receiveTestResults(result));
  } catch (e) {
    receiveTestResults(null);
  }
}

function* fetchProgramBooking() {
  try {
    const result: StandardResponse | null = yield call(
      requestToFetchUserProgramBooking,
    );
    yield put(receiveProgramBooking(result));
  } catch (e) {
    receiveProgramBooking(null);
  }
}

function* authByWechat(action: {
  type: string;
  payload: {
    code: string;
    isWechatBrowser: boolean;
    redirect: string;
  };
}) {
  try {
    // const { isWechatBrowser, code } = action.payload;
    const signInResponse: UserLoginResponse = yield call(
      requestToAuthWechatOnAPI,
      action.payload,
    );

    if (!signInResponse.success || !signInResponse.auth_token) {
      yield put(recevieAuthResponse(signInResponse));
    } else {
      yield localStorage.setItem("jwt", `Bearer ${signInResponse.auth_token}`);
      yield put(recevieAuthResponse(signInResponse));
      yield put(receiveUser(signInResponse.data));
      //window.location.href = action.payload.redirect || '/';
      // yield put(receiveUser(result.data));
    }
  } catch (e) {
    recevieAuthResponse({
      success: false,
      code: 500,
      data: null,
      message: "服务器无法处理该请求，请重试。",
    });
  }
}

function* verifyUserEmail(action: {
  type: string;
  payload: {
    token: string;
  };
}) {
  try {
    const response: StandardResponse | null = yield call(
      requestToVerifyEmail,
      action.payload,
    );
    yield put(receiveVerificationResponse(response));
  } catch (e) {
    receiveVerificationResponse(CONNECTION_FAILURE);
  }
}

function* sendSmsToPhone(action: {
  type: string;
  payload: {
    phone: string;
  };
}) {
  try {
    const response: StandardResponse | null = yield call(
      requestToSendSmsToPhone,
      action.payload,
    );
    yield put(receiveSmsSendingResponse(response));
  } catch (e) {
    receiveSmsSendingResponse(CONNECTION_FAILURE);
  }
}

function* authByPhone(action: {
  type: string;
  payload: {
    phone: string;
    passcode: string;
  };
}) {
  try {
    const response: UserLoginResponse | null = yield call(
      requestToAuthByPhone,
      action.payload,
    );
    if (!response || !response.success || !response.auth_token) {
      yield put(receiveLoginError(response));
    } else {
      localStorage.setItem("jwt", `Bearer ${response.auth_token}`);
      window.location.reload();
      // yield put(receiveUser(result.data));
    }
  } catch (e) {
    receiveLoginError(CONNECTION_FAILURE);
  }
}

function* saveGeneralInquiry(action: {
  type: string;
  payload: GeneralInquiryForm;
}) {
  try {
    const response: StandardResponse | null = yield call(
      requestToSendGeneralInquiry,
      action.payload,
    );
    yield put(receiveGeneralInquiryResponse(response));
  } catch (e) {
    receiveGeneralInquiryResponse(CONNECTION_FAILURE);
  }
}

function* watchUserAuthAsync() {
  yield takeEvery(sagaActions.LOGIN_BY_EMAIL, loginByEmail);
  yield takeEvery(sagaActions.FETCH_USER, fetchUser);
  yield takeEvery(sagaActions.FETCH_ALL_USERS, fetchAllUsers);
  yield takeEvery(sagaActions.FETCH_TEST_RESULTS, fetchTestResults);
  yield takeEvery(sagaActions.FETCH_TEST_RESULTS_BY_ID, fetchTestResultsById);
  yield takeEvery(sagaActions.FETCH_PROGRAM_BOOKING, fetchProgramBooking);
  yield takeEvery(sagaActions.REGISTER_BY_EMAIL, registerByEmail);
  yield takeEvery(sagaActions.AUTH_BY_WECHAT, authByWechat);
  yield takeEvery(sagaActions.VERIFY_EMAIL, verifyUserEmail);
  yield takeEvery(sagaActions.SEND_SMS_TO_PHONE, sendSmsToPhone);
  yield takeEvery(sagaActions.AUTH_BY_PHONE, authByPhone);
  yield takeEvery(sagaActions.SEND_GENERAL_INQUIRY, saveGeneralInquiry);
}

export default [watchUserAuthAsync()];
