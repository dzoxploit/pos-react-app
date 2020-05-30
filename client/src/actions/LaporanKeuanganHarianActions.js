import axios from "axios";

import {
    GET_LAPORANKEUANGANHARIAN,
    GET_LAPORANKEUANGANHARIANS,
    CLEAR_CURRENT_LAPORANKEUANGANHARIANS,
    LAPORANKEUANGANHARIANS_LOADING,
    GET_ERRORS,
    DELETE_LAPORANKEUANGANHARIANS,
} from "./types";

export const getCurrentLaporanKeuanganHarian = () => dispatch => {
    dispatch(setBahanBakuLoading());
    axios
        .get("api/laporan-keuangan-harian")
        .then(res =>
            dispatch({
                type: GET_LAPORANKEUANGANHARIAN,
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
export const getLaporanKeuanganHarianById = id => dispatch => {
    dispatch(setLaporanKeuanganHarianLoading());
    axios
        .get(`api/laporan-keuangan-harian/edit/${id}`)
        .then(res => 
            dispatch({
                type: GET_LAPORANKEUANGANHARIAN,
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

export const createLaporanKeuanganHarian = (laporankeuanganharianData, history) => dispatch => {
    axios
      .post("/api/laporan-keuangan-harian/create", laporankeuanganharianData)
      .then(res => history.push("/dashboard/admin/laporan-keuangan-harian"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const updateLaporanKeuanganHarian = (id, laporankeuanganharianData, history) => dispatch => {
    axios
      .post(`/api/laporan-keuangan-harian/update/${id}`, laporankeuanganharianData)
      .then(res => history.push("/dashboard/admin/laporan-keuangan-harian"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const deleteLaporanKeuanganHarian = id => dispatch => {
    axios
      .delete(`/api/laporan-keuangan-harian/delete/${id}`)
      .then(res =>
        dispatch({
          type: GET_LAPORANKEUANGANHARIAN,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const setLaporanKeuanganHarianLoading = () => {
    return {
      type: LAPORANKEUANGANHARIAN_LOADING
    };
  };
  
  export const clearCurrentLaporanKeuanganHarian = () => {
    return {
      type: CLEAR_CURRENT_LAPORANKEUANGANHARIAN
    };
  };