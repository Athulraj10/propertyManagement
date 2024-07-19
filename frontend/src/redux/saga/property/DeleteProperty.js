import { all, call, put, takeEvery } from "redux-saga/effects";
import { DELETE_PROPERTY } from "../../actions/types";
import { deletePropertySuccess, deletePropertyFailure } from "../../actions";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* deletePropertyrequest(action) {
  try {
    console.log(action.payload)
    let data = null;
    if(action.payload.data.lead === true){
      const response = yield API.delete(`/admin/delete-property-lead`, {
        params: {
          propertyId: action.payload.data.propertyId,
          leadId: action.payload.data.leadId,
        }
      });
      
      ({ data } = response);
    }else{
      const  response = yield API.delete(`/admin/delete-property/${action.payload.data.id}`);
      ({ data } = response);
    }
    if (data?.meta?.code === 200) {
      yield put(deletePropertySuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      notifyWarning(data?.message);
      yield put(deletePropertyFailure());
    } else if (data?.meta?.code !== 200) {
      yield put(deletePropertyFailure());
      notifyWarning(data?.meta?.message);
    }
  } catch (error) {
    yield put(deletePropertyFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchDeletePropertyAPI() {
  yield takeEvery(DELETE_PROPERTY , deletePropertyrequest);
}

export default function* rootSaga() {
  yield all([watchDeletePropertyAPI()]);
}
