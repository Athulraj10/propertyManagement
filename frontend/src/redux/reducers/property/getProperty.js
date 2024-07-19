import {
    GET_PROPERTY,
    GET_PROPERTY_FAILURE,
    GET_PROPERTY_SUCCESS,
  } from "../../actions/types";
  
  const INIT_STATE = {
    loading: false,
  };
  
  const getProperty = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_PROPERTY:
        return { ...state, loading: true };
      case GET_PROPERTY_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case GET_PROPERTY_FAILURE:
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  
  export default getProperty;
  