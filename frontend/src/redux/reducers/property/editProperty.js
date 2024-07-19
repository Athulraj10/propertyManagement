import {
    EDIT_PROPERTY,
    EDIT_PROPERTY_FAILURE,
    EDIT_PROPERTY_SUCCESS,
  } from "../../actions/types";
  
  const INIT_STATE = {
    loading: false,
  };
  
  const editProperty = (state = INIT_STATE, action) => {
    switch (action.type) {
      case EDIT_PROPERTY:
        return { ...state, loading: true };
      case EDIT_PROPERTY_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case EDIT_PROPERTY_FAILURE:
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  
  export default editProperty;
  