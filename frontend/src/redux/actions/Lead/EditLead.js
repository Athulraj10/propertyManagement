import {
    EDIT_LEAD,
    EDIT_LEAD_SUCCESS,
    EDIT_LEAD_FAILURE,
  } from "../types";
  
  export const editLead = (payload) => ({
    type: EDIT_LEAD,
    payload,
  });
  
  export const editLeadSuccess = (payload) => ({
    type: EDIT_LEAD_SUCCESS,
    payload,
  });
  
  export const editLeadFailure = () => ({
    type: EDIT_LEAD_FAILURE,
  });
  