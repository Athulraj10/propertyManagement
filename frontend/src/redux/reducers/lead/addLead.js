import {
    ADD_LEAD,
    ADD_LEAD_FAILURE,
    ADD_LEAD_SUCCESS,
  } from "../../actions/types";
  
  const INIT_STATE = {
    loading: false,
  };
  
  const addLead = (state = INIT_STATE, action) => {
    switch (action.type) {
      case ADD_LEAD:
        return { ...state, loading: true };
      case ADD_LEAD_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case ADD_LEAD_FAILURE:
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  
  export default addLead;
  