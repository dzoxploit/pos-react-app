import axios from "axios";

import {
    GET_GUDANG,
    GET_GUDANGS,
    CLEAR_CURRENT_GUDANG,
    GUDANG_LOADING,
    GET_ERRORS,
    DELETE_GUDANG,
} from "./types";

export const getCurrentGudang = () => dispatch => {
    dispatch(setGudangLoading());
    axios
        .get("api/gudang")
        .then(res =>
            dispatch({
                type: GET_GUDANG,
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
export const getGudangBySlug = gudang_slug => dispatch => {
    dispatch(setDistributorLoading());
    axios
        .get(`api/gudang/${gudang_slug}`)
        .then(res => 
            dispatch({
                type: GET_GUDANG,
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
export const getGudangById = id => dispatch => {
    dispatch(setGudangLoading());
    axios
        .get(`api/gudang/${id}`)
        .then(res => 
            dispatch({
                type: GET_GUDANG,
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

export const createGudang = (gudangData, history) => dispatch => {
    axios
      .post("/api/gudang", distributorData)
      .then(res => history.push("/dashboard/admin"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };