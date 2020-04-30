import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_ADMIN } from "./types";

export const registerAdmin = (userData, history) => dispatch => {
  axios
  .get("api/admin/register-admin")
  .then(res =>
      dispatch({
          type: GET_ADMIN,
          payload: res.data
      })
  )
  .catch(err => 
      dispatch({
          type: GET_ERRORS,
          payload: {}
      })
  );
};

export const loginAdmin = adminData => dispatch => {
  axios
    .post("/api/admin/login", adminData)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("jwt", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwt");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
