import {
    GET_LEAD,
    GET_LEAD_SUCCESS,
    GET_LEAD_FAILURE,
  } from "../types";
  
  export const getLead = (payload) => ({
    type: GET_LEAD,
    payload,
  });
  
  export const getLeadSuccess = (payload) => ({
    type: GET_LEAD_SUCCESS,
    payload,
  });
  
  export const getLeadFailure = () => ({
    type: GET_LEAD_FAILURE,
  });
  