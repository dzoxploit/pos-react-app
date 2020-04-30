import axios from "axios";

import {
  GET_BARANG,
  GET_BARANGS,
  CLEAR_CURRENT_BARANG,
  BARANG_LOADING,
  GET_ERRORS,
  DELETE_BARANG,
  SET_CURRENT_USER
} from "./types";

export const getCurrentBarang = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/barang")
    .then(res =>
      dispatch({
        type: GET_BARANG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BARANG,
        payload: {}
      })
    );
};

export const getBarangBySlug = slug => dispatch => {
  dispatch(setBarangLoading());
  axios
    .get(`/api/barang/${slug}`)
    .then(res =>
      dispatch({
        type: GET_BARANG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BARANG,
        payload: null
      })
    );
};

export const createBarang = (barangData, history) => dispatch => {
  axios
    .post("/api/barang", barangData)
    .then(res => history.push("/dashboard/admin"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const createBarangJualOffline = (barangjualofflineData, history) => dispatch => {
    axios
      .post("/api/barang/barang-jual-offline", barangjualofflineData)
      .then(res => history.push("/dashboard/admin"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const createBarangJualOnline = (barangjualofflineData, history) => dispatch => {
    axios
      .post("/api/barang/barang-jual-online", barangData)
      .then(res => history.push("/dashboard/admin"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const createBarangKeluar =  (barangkeluarData, history) => dispatch => {
  axios
    .post("/api/barang/barang-keluar", barangkeluarData)
    .then(res => history.push("/dashboard/admin"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  export const createBarangBukalapak = (barangData, history) => dispatch => {
    axios
      .post("/api/barang", barangData)
      .then(res => history.push("/dashboard/admin"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const createBarangTokopedia = (barangData, history) => dispatch => {
    axios
      .post("/api/barang", barangData)
      .then(res => history.push("/dashboard/admin"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const createBarangMasuk = (barangmasukData, history) => dispatch => {
    axios
      .post("api/barang/add-barang-masuk", barangmasukdata)
      .then(res => history.push("/dashboard/admin"))
      .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
      );
}

export const addClasificationSizeBarang = (clasificationData, history) => dispatch => {
  axios
    .post("/api/barang/clasification-size-barang", clasificationData)
    .then(res => history.push("/dashboard/admin"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addTypeUkuran = (typeukuranData, history) => dispatch => {
  axios
    .post("/api/barang/type-ukuran-barang", typeukuranData)
    .then(res => history.push("/dashboard/admin"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteBarang = id => dispatch => {
  axios
    .delete(`/api/barang/${id}`)
    .then(res =>
      dispatch({
        type: GET_BARANG,
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

export const getBarangs = () => dispatch => {
  dispatch(setBarangLoading());
  axios
    .get("/api/barang/all")
    .then(res =>
      dispatch({
        type: GET_BARANGS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BARANGS,
        payload: null
      })
    );
};

export const setBarangLoading = () => {
  return {
    type: BARANG_LOADING
  };
};

export const clearCurrentBarang = () => {
  return {
    type: CLEAR_CURRENT_BARANG
  };
};

