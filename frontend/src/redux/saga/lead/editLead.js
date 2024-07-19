import { all, call, put, takeEvery } from "redux-saga/effects";
import { EDIT_LEAD } from "../../actions/types";
import { editLeadSuccess, editLeadFailure } from "../../actions";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* EditLeadrequest(action) {
  try {
    const { data } = yield API.post(
      "/admin/edit-lead",
      action?.payload?.data
    );
    if (data?.meta?.code === 200) {
      yield put(editLeadSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      notifyWarning(data?.message);
      yield put(editLeadFailure());
    } else if (data?.meta?.code !== 200) {
      yield put(editLeadFailure());
      notifyWarning(data?.meta?.message);
    }
  } catch (error) {
    yield put(editLeadFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchEditLeadAPI() {
  yield takeEvery(EDIT_LEAD , EditLeadrequest);
}

export default function* rootSaga() {
  yield all([watchEditLeadAPI()]);
}
