import { all, call, put, takeEvery } from "redux-saga/effects";
import { EDIT_PROPERTY } from "../../actions/types";
import { editPropertySuccess, editPropertyFailure } from "../../actions";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* EditPropertyrequest(action) {
  try {
    const { data } = yield API.post(
      "/admin/edit-property",
      action?.payload?.data
    );
    if (data?.meta?.code === 200) {
      yield put(editPropertySuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      notifyWarning(data?.message);
      yield put(editPropertyFailure());
    } else if (data?.meta?.code !== 200) {
      yield put(editPropertyFailure());
      notifyWarning(data?.meta?.message);
    }
  } catch (error) {
    yield put(editPropertyFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchEditPropertyAPI() {
  yield takeEvery(EDIT_PROPERTY , EditPropertyrequest);
}

export default function* rootSaga() {
  yield all([watchEditPropertyAPI()]);
}
