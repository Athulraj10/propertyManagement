import { all, call, put, takeEvery } from "redux-saga/effects";
import { NEW_USER_REGISTER } from "../../actions/types";
import { newUserRegisterSuccess, newUserRegisterFailure } from "../../actions";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* newUserRegisterRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/register",
      action?.payload?.data
    );
    if (data?.meta?.code === 200) {
      yield put(newUserRegisterSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      notifyWarning(data?.message);
      yield put(newUserRegisterFailure());
    } else if (data?.meta?.code !== 200) {
      yield put(newUserRegisterFailure());
      notifyWarning(data?.meta?.message);
    }
  } catch (error) {
    yield put(newUserRegisterFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchNewUserRegisterAPI() {
  yield takeEvery(NEW_USER_REGISTER, newUserRegisterRequest);
}

export default function* rootSaga() {
  yield all([watchNewUserRegisterAPI()]);
}
