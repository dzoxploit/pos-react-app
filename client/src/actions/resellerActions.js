import axios from "axios";

import {
    GET_RESELLER,
    GET_RESELLERS,
    CLEAR_CURRENT_RESELLER,
    RESELLER_LOADING,
    GET_ERRORS
} from "./types";

export const getCurrentReseller = () => dispatch => {
    dispatch(setResellerLoading());
    axios
        .get("api/reselller")
        .then(res =>
            dispatch({
                type: GET_RESELLER,
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
export const getResellerById = id => dispatch => {
    dispatch(setResellerLoading());
    axios
        .get(`api/reselller/${id}`)
        .then(res => 
            dispatch({
                type: GET_RESELLER,
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

export const getDetailResellerBarangByResellerCode = reseller_code => dispatch => {
    dispatch(setDetailResellerBarangLoading());
    axios
        .get(`api/reseller/detail-barang/${reseller_code}`)
        .then(res =>
            dispatch({
                type: GET_DETAILRESELLERBARANG,
                payload: res.data
            }) 
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
}
export const createDetailResellerBarang = (DetailResellerBarangData, history) => dispatch => {
    axios
      .post("/api/reseller/detail-reseller-barang", DetailResellerBarangData)
      .then(res => history.push("/dashboard/admin/reseller"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
export const updateDetailResellerBarang = (id, DetailResellerBarangData, history) => dispatch => {
    axios
      .post(`/api/reseller/detail-reseller-barang/edit/${id}`, DetailResellerBarangData)
      .then(res => history.push("/dashboard/admin/reseller"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }


export const createProductionBarang = (productionbarangData, history) => dispatch => {
    axios
      .post("/api/production-barang", productionbarangData)
      .then(res => history.push("/dashboard/admin/production-barang"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
  export const addClasificationProductionBarang  = (cpbData, history) => dispatch => {
    axios
      .post("/api/production-barang/clasification", cpbData)
      .then(res => history.push("/dashboard/admin/production-barang"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
  