import {
    DELETE_PROPERTY,
    DELETE_PROPERTY_FAILURE,
    DELETE_PROPERTY_SUCCESS,
  } from "../../actions/types";
  
  const INIT_STATE = {
    loading: false,
  };
  
  const deleteProperty = (state = INIT_STATE, action) => {
    switch (action.type) {
      case DELETE_PROPERTY:
        return { ...state, loading: true };
      case DELETE_PROPERTY_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case DELETE_PROPERTY_FAILURE:
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  
  export default deleteProperty;
  