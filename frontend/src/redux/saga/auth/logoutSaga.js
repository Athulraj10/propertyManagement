import { put, takeEvery, all, call } from "redux-saga/effects";
import { LOGOUT } from "../../actions/types";
import API from "../../../utils/api";
import { logOutSuccess } from "../../actions/auth/logoutAction";

function* logoutSaga(action) {
  let admin = false;
  let data = null;

console.log(action,'action')

  if (action.payload.data.admin === true) {
    admin = true;
  } else {
    admin = false;
  }
  const payload = action.payload.data.id;

  if (admin) {
    const response = yield API.post("/admin/logout", payload);
    ({ data } = response);
  } else {
    const response = yield API.post("/api/v1/logout", payload);
    ({ data } = response);
  }

  console.log("data",data)

  if (data?.meta?.code === 200) {
    if(admin){
      localStorage.removeItem("adminData");
      localStorage.removeItem("token");
    }else{
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
    }
    yield put(logOutSuccess());
    yield call(action.payload.callback, data);
  }
}

export function* watchlogoutAPI() {
  yield takeEvery(LOGOUT, logoutSaga);
}

export default function* rootSaga() {
  yield all([watchlogoutAPI()]);
}
