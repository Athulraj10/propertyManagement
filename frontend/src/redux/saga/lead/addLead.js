import { all, call, put, takeEvery } from "redux-saga/effects";
import { ADD_LEAD } from "../../actions/types";
import { addLeadSuccess, addLeadFailure } from "../../actions";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* addLeadrequest(action) {
  try {
    const { data } = yield API.post(
      "/admin/add-lead",
      action?.payload?.data
    );
    if (data?.meta?.code === 200) {
      yield put(addLeadSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      notifyWarning(data?.message);
      yield put(addLeadFailure());
    } else if (data?.meta?.code !== 200) {
      yield put(addLeadFailure());
      notifyWarning(data?.meta?.message);
    }
  } catch (error) {
    yield put(addLeadFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchAddLeadAPI() {
  yield takeEvery(ADD_LEAD, addLeadrequest);
}

export default function* rootSaga() {
  yield all([watchAddLeadAPI()]);
}
