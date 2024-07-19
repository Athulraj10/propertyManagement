import {
    EDIT_LEAD,
    EDIT_LEAD_FAILURE,
    EDIT_LEAD_SUCCESS,
  } from "../../actions/types";
  
  const INIT_STATE = {
    loading: false,
  };
  
  const editLead = (state = INIT_STATE, action) => {
    switch (action.type) {
      case EDIT_LEAD:
        return { ...state, loading: true };
      case EDIT_LEAD_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case EDIT_LEAD_FAILURE:
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  
  export default editLead;
  