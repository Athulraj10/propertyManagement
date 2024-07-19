import {
    GET_PROPERTY,
    GET_PROPERTY_SUCCESS,
    GET_PROPERTY_FAILURE,
  } from "../types";
  
  export const getProperty = (payload) => ({
    type: GET_PROPERTY,
    payload,
  });
  
  export const getPropertySuccess = (payload) => ({
    type: GET_PROPERTY_SUCCESS,
    payload,
  });
  
  export const getPropertyFailure = () => ({
    type: GET_PROPERTY_FAILURE,
  });
  