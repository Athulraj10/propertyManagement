import {
    DELETE_LEAD,
    DELETE_LEAD_FAILURE,
    DELETE_LEAD_SUCCESS,
  } from "../../actions/types";
  
  const INIT_STATE = {
    loading: false,
  };
  
  const deleteLead = (state = INIT_STATE, action) => {
    switch (action.type) {
      case DELETE_LEAD:
        return { ...state, loading: true };
      case DELETE_LEAD_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case DELETE_LEAD_FAILURE:
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  
  export default deleteLead;
  