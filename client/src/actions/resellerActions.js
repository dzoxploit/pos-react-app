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
export const getResellerByResellerCode = reseller_code => dispatch => {
    dispatch(setResellerLoading());
    axios
        .get(`api/reseller/${reseller_code}`)
        .then(res =>
            dispatch({
                type: GET_RESELLERB,
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
export const updateDetailResellerBarang = (id, reseller_code, DetailResellerBarangData, history) => dispatch => {
    axios
      .post(`/api/reseller/detail-reseller-barang/update/${id}/${reseller_code}`, DetailResellerBarangData)
      .then(res => history.push("/dashboard/admin/reseller"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }


export const createReseller = (resellerData, history) => dispatch => {
    axios
      .post("/api/reseller", resellerData)
      .then(res => history.push("/dashboard/admin/reseller"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
  export const updateReseller = (id, reseller_code ,ResellerData, history) => dispatch => {
    axios
      .post(`/api/reseller/reseller/update/${id}/${reseller_code}`, ResellerData)
      .then(res => history.push("/dashboard/admin/reseller"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
  export const setResellerLoading = () => {
    return {
      type: RESELLER_LOADING
    };
  };
  
  export const clearCurrentReseller = () => {
    return {
      type: CLEAR_CURRENT_RESELLER
    };
  };
  export const setDetailResellerBarangLoading = () => {
    return {
      type: DETAILRESELLERBARANG_LOADING
    };
  };
  
  export const clearCurrentDetailResellerBarang = () => {
    return {
      type: CLEAR_CURRENT_DETAILRESELLERBARANG
    };
  };
  
  