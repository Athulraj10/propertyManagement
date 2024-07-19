import { LOGOUT, LOGOUTSUCCESS } from "../../actions/types";

const INIT_STATE = {
  loading: false,
};

const logoutReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...state, loading: true };
    case LOGOUTSUCCESS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default logoutReducer;
