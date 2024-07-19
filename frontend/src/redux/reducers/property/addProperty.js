import {
    ADD_PROPERTY,
    ADD_PROPERTY_FAILURE,
    ADD_PROPERTY_SUCCESS,
  } from "../../actions/types";
  
  const INIT_STATE = {
    loading: false,
  };
  
  const addProperty = (state = INIT_STATE, action) => {
    switch (action.type) {
      case ADD_PROPERTY:
        return { ...state, loading: true };
      case ADD_PROPERTY_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case ADD_PROPERTY_FAILURE:
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  
  export default addProperty;
  