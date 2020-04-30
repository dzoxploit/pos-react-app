import axios from "axios";

import {
    GET_PRODUCTIONBARANG,
    GET_PRODUCTIONBARANGS,
    CLEAR_CURRENT_PRODUCTIONBARANGS,
    PRODUCTIONBARANG_LOADING,
    GET_ERRORS
} from "./types";

export const getCurrentProductionBarang = () => dispatch => {
    dispatch(setProductionBarangLoading());
    axios
        .get("api/production-barang")
        .then(res =>
            dispatch({
                type: GET_PRODUCTIONBARANG,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })s
        );
};
export const getProductionBarangById = id => dispatch => {
    dispatch(setProductionBarangLoading());
    axios
        .get(`api/production-barang/${id}`)
        .then(res => 
            dispatch({
                type: GET_PRODUCTIONBARANG,
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
  
  