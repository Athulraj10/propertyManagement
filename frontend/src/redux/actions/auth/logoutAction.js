import { LOGOUT, LOGOUTSUCCESS } from "../types";

export const logOut = (payload) => ({
  type: LOGOUT,
  payload,
});

export const logOutSuccess = (payload) => ({
  type: LOGOUTSUCCESS,
  payload,
});
