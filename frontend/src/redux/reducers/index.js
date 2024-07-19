import { combineReducers } from "redux";
//import all reducers creating here, and add inside the combine reducers

import Register from "./register/register";
import Login from "./auth/loginReducer";
import Logout from "./auth/logoutReducer";
import AddProperty from "./property/addProperty";
import GetProperty from "./property/getProperty";
import DeleteProperty from "./property/deleteProperty";
import EditProperty from "./property/editProperty";
import LeadProperty from "./lead/LeadProperty";
import AddLead from "./lead/addLead";
import DeleteLead from "./lead/deleteLead";
import EditLead from "./lead/editLead";

// import exampleReducer from "./path"

const appReducer = combineReducers({
  //exampleReducer
  Register,
  Login,
  Logout,
  AddProperty,
  GetProperty,
  DeleteProperty,
  EditProperty,
  LeadProperty,
  AddLead,
  DeleteLead,
  EditLead,


  
});

const reducers = (state, action) => {
  return appReducer(state, action);
};

export default reducers;
