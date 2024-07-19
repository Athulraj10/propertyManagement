import {
    DELETE_LEAD,
    DELETE_LEAD_SUCCESS,
    DELETE_LEAD_FAILURE,
  } from "../types";
  
  export const deleteLead = (payload) => ({
    type: DELETE_LEAD,
    payload,
  });
  
  export const deleteLeadSuccess = (payload) => ({
    type: DELETE_LEAD_SUCCESS,
    payload,
  });
  
  export const deleteLeadFailure = () => ({
    type: DELETE_LEAD_FAILURE,
  });
  