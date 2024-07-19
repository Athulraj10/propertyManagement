import {
    EDIT_PROPERTY,
    EDIT_PROPERTY_SUCCESS,
    EDIT_PROPERTY_FAILURE,
  } from "../types";
  
  export const editProperty = (payload) => ({
    type: EDIT_PROPERTY,
    payload,
  });
  
  export const editPropertySuccess = (payload) => ({
    type: EDIT_PROPERTY_SUCCESS,
    payload,
  });
  
  export const editPropertyFailure = () => ({
    type: EDIT_PROPERTY_FAILURE,
  });
  