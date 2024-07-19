import { all, call, put, takeEvery } from "redux-saga/effects";
import { DELETE_LEAD } from "../../actions/types";
import { deleteLeadSuccess, deleteLeadFailure } from "../../actions";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* deleteLeadrequest(action) {
  try {
    const { data } = yield API.delete(`/admin/delete-lead/${action.payload.data}`);
    if (data?.meta?.code === 200) {
      yield put(deleteLeadSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      notifyWarning(data?.message);
      yield put(deleteLeadFailure());
    } else if (data?.meta?.code !== 200) {
      yield put(deleteLeadFailure());
      notifyWarning(data?.meta?.message);
    }
  } catch (error) {
    yield put(deleteLeadFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchDeleteLeadAPI() {
  yield takeEvery(DELETE_LEAD , deleteLeadrequest);
}

export default function* rootSaga() {
  yield all([watchDeleteLeadAPI()]);
}
