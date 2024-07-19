import {
    ADD_LEAD,
    ADD_LEAD_SUCCESS,
    ADD_LEAD_FAILURE,
  } from "../types";
  
  export const addLead = (payload) => ({
    type: ADD_LEAD,
    payload,
  });
  
  export const addLeadSuccess = (payload) => ({
    type: ADD_LEAD_SUCCESS,
    payload,
  });
  
  export const addLeadFailure = () => ({
    type: ADD_LEAD_FAILURE,
  });
  