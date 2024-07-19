import {
    ADD_PROPERTY,
    ADD_PROPERTY_SUCCESS,
    ADD_PROPERTY_FAILURE,
  } from "../types";
  
  export const addProperty = (payload) => ({
    type: ADD_PROPERTY,
    payload,
  });
  
  export const addPropertySuccess = (payload) => ({
    type: ADD_PROPERTY_SUCCESS,
    payload,
  });
  
  export const addPropertyFailure = () => ({
    type: ADD_PROPERTY_FAILURE,
  });
  