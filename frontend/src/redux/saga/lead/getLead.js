import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_LEAD } from "../../actions/types";
import { getLeadSuccess, getLeadFailure } from "../../actions";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* getLeadRequest(action) {
  try {
    const { data } = yield API.post(
      "/admin/get-lead"
    );
    if (data?.meta?.code === 200) {
      yield put(getLeadSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      notifyWarning(data?.message);
      yield put(getLeadFailure());
    } else if (data?.meta?.code !== 200) {
      yield put(getLeadFailure());
      notifyWarning(data?.meta?.message);
    }
  } catch (error) {
    yield put(getLeadFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetLeadAPI() {
  yield takeEvery(GET_LEAD , getLeadRequest);
}

export default function* rootSaga() {
  yield all([watchGetLeadAPI()]);
}
