import { getDefaultState } from "../../../utils/helper";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../../actions/types";

const token = getDefaultState("token");
const INIT_STATE = {
  loading: false,
  login: null,
  loggedIn: token ? true : false,
};

const loginReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
        loggedIn: true,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false };
    case LOGOUT:
      return { ...state, login: null, loading: false, loggedIn: false };
    default:
      return state;
  }
};

export default loginReducer;
