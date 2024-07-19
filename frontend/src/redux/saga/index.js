import { all } from "redux-saga/effects";
import Register from "./register/register";
import Login from "../saga/auth/loginSaga";
import Logout from "../saga/auth/logoutSaga";
import AddProperty from "../saga/property/addProperty";
import GetProperty from "../saga/property/getProperty";
import DeleteProperty from "../saga/property/DeleteProperty";
import EditProperty from "../saga/property/editProperty";
import GetLead from "../saga/lead/getLead";
import AddLead from "../saga/lead/addLead";
import DeleteLead from "../saga/lead/DeleteLead";
import EditLead from "../saga/lead/editLead";


export default function* rootSaga() {
  yield all([
    Register(),
    Login(),
    Logout(),
    AddProperty(),
    GetProperty(),
    DeleteProperty(),
    EditProperty(),
    GetLead(),
    AddLead(),
    DeleteLead(),
    EditLead(),
  ]);
}
