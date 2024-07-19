import { all, call, put, takeEvery } from "redux-saga/effects";
import { LOGIN } from "../../actions/types";
import { loginSuccess, loginFailure } from "../../actions";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning, setLocalStorageItem } from "../../../utils/helper";

function* loginRequest(action) {
  try {
    let data = null;
    let admin = false;
    if (action.payload.data.admin === true) {
      admin=true
      const response = yield API.post(
        "/admin/login",
        action?.payload?.data.formData
      );
      ({ data } = response);
    } else {
      const response = yield API.post(
        "/api/v1/login",
        action?.payload?.data
      );
      ({ data } = response);
    }
    
    if (data.meta.code === 200) {
      yield put(loginSuccess(data));
     if(admin === true){
      setLocalStorageItem("adminData",data?.data?._id)
      setLocalStorageItem("token",data.meta.token)
     }else{
      setLocalStorageItem("userData",data?.data?._id)
      setLocalStorageItem("token",data.meta.token)
     }
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data.meta.code !== 200) {
      notifyWarning(data?.meta?.message);
      yield put(loginFailure(data));
    }
  } catch (error) {
    yield put(loginFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchloginAPI() {
  yield takeEvery(LOGIN, loginRequest);
}

export default function* rootSaga() {
  yield all([watchloginAPI()]);
}
