import { all, call, put, takeEvery } from "redux-saga/effects";
import { ADD_PROPERTY } from "../../actions/types";
import { addPropertySuccess, addPropertyFailure } from "../../actions";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* addPropertyrequest(action) {
  try {
    const { data } = yield API.post(
      "/admin/add-property",
      action?.payload?.data
    );
    if (data?.meta?.code === 200) {
      yield put(addPropertySuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      notifyWarning(data?.message);
      yield put(addPropertyFailure());
    } else if (data?.meta?.code !== 200) {
      yield put(addPropertyFailure());
      notifyWarning(data?.meta?.message);
    }
  } catch (error) {
    yield put(addPropertyFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchAddPropertyAPI() {
  yield takeEvery(ADD_PROPERTY, addPropertyrequest);
}

export default function* rootSaga() {
  yield all([watchAddPropertyAPI()]);
}
