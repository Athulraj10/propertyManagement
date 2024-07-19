import {
    DELETE_PROPERTY,
    DELETE_PROPERTY_SUCCESS,
    DELETE_PROPERTY_FAILURE,
  } from "../types";
  
  export const deleteProperty = (payload) => ({
    type: DELETE_PROPERTY,
    payload,
  });
  
  export const deletePropertySuccess = (payload) => ({
    type: DELETE_PROPERTY_SUCCESS,
    payload,
  });
  
  export const deletePropertyFailure = () => ({
    type: DELETE_PROPERTY_FAILURE,
  });
  