import {
    GET_LEAD,
    GET_LEAD_FAILURE,
    GET_LEAD_SUCCESS,
  } from "../../actions/types";
  
  const INIT_STATE = {
    loading: false,
  };
  
  const getLead = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_LEAD:
        return { ...state, loading: true };
      case GET_LEAD_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case GET_LEAD_FAILURE:
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  
  export default getLead;
  