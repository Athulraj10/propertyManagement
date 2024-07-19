import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_PROPERTY } from "../../actions/types";
import { getPropertySuccess, getPropertyFailure } from "../../actions";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* getPropertyrequest(action) {
  try {
    let data;
    if (action.payload.isAdmin === true) {
      const response = yield API.post(
        "/admin/get-property",
        action?.payload?.data
      );
      ({ data } = response);
    } else {
      const response = yield API.post(
        "/api/v1/get-property",
        action?.payload?.data
      );
      ({ data } = response);
    }


    if (data?.meta?.code === 200) {
      yield put(getPropertySuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      notifyWarning(data?.message);
      yield put(getPropertyFailure());
    } else if (data?.meta?.code !== 200) {
      yield put(getPropertyFailure());
      notifyWarning(data?.meta?.message);
    }
  } catch (error) {
    yield put(getPropertyFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetPropertyAPI() {
  yield takeEvery(GET_PROPERTY, getPropertyrequest);
}

export default function* rootSaga() {
  yield all([watchGetPropertyAPI()]);
}
