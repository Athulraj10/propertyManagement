import {
    NEW_USER_REGISTER,
    NEW_USER_REGISTER_SUCCESS,
    NEW_USER_REGISTER_FAILURE,
  } from "../types";
  
  export const newUserRegister = (payload) => ({
    type: NEW_USER_REGISTER,
    payload,
  });
  
  export const newUserRegisterSuccess = (payload) => ({
    type: NEW_USER_REGISTER_SUCCESS,
    payload,
  });
  
  export const newUserRegisterFailure = () => ({
    type: NEW_USER_REGISTER_FAILURE,
  });
  