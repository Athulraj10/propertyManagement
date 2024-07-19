import {
    NEW_USER_REGISTER,
    NEW_USER_REGISTER_FAILURE,
    NEW_USER_REGISTER_SUCCESS,
  } from "../../actions/types";
  
  const INIT_STATE = {
    loading: false,
  };
  
  const register = (state = INIT_STATE, action) => {
    switch (action.type) {
      case NEW_USER_REGISTER:
        return { ...state, loading: true };
      case NEW_USER_REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case NEW_USER_REGISTER_FAILURE:
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  
  export default register;
  