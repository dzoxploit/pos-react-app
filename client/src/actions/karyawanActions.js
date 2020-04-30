import axios from "axios";

import {
    GET_KARYAWAN,
    GET_KARYAWANS,
    CLEAR_CURRENT_KARYAWAN,
    KARYAWAN_LOADING,
    GET_ERRORS,
    DELETE_KARYAWAN,
} from "./types";

export const getCurrentKaryawan = () => dispatch => {
    dispatch(setKaryawanLoading());
    axios
        .get("api/karyawan")
        .then(res =>
            dispatch({
                type: GET_KARYAWAN,
                payload: res.data
            })s
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
};
export const getKaryawanBySlug = karyawan_slug => dispatch => {
    dispatch(setKaryawanLoading());
    axios
        .get(`api/karyawan/show/${karyawan_slug}`)
        .then(res => 
            dispatch({
                type: GET_KARYAWAN,
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
export const getKaryawanById = id => dispatch => {
    dispatch(setKaryawanLoading());
    axios
        .get(`api/karyawan/edit/${id}`)
        .then(res => 
            dispatch({
                type: GET_KARYAWAN,
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

export const createKaryawan = (karyawanData, history) => dispatch => {
    axios
      .post("/api/karyawan", distributorData)
      .then(res => history.push("/dashboard/admin"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const updatePasswordKaryawanAccount = (karyawanPasswordData, history) => dispatch => {
    axios
    .post("/api/karyawan/edit-passowrd", karyawanPasswordData)
    .then(res => history.push("/dashboard/karyawan"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}