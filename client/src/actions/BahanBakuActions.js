import axios from "axios";

import {
    GET_BAHANBAKU,
    GET_BAHANBAKUS,
    CLEAR_CURRENT_BAHANBAKU,
    BAHANBAKU_LOADING,
    GET_ERRORS,
    DELETE_BAHANBAKU,
} from "./types";

export const getCurrentBahanBaku = () => dispatch => {
    dispatch(setBahanBakuLoading());
    axios
        .get("api/bahan-baku")
        .then(res =>
            dispatch({
                type: GET_BAHANBAKU,
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
export const getBahanBakuBySlug = bahan_baku_slug => dispatch => {
    dispatch(setBahanBakuLoading());
    axios
        .get(`api/bahan-baku/${bahan_baku_slug}`)
        .then(res => 
            dispatch({
                type: GET_BAHANBAKU,
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
export const getBahanBakuById = id => dispatch => {
    dispatch(setBahanBakuLoading());
    axios
        .get(`api/bahan-baku/edit/${id}`)
        .then(res => 
            dispatch({
                type: GET_DISTRIBUTOR,
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

export const createBahanBaku = (bahanbakuData, history) => dispatch => {
    axios
      .post("/api/bahan-baku/create", bahanbakuData)
      .then(res => history.push("/dashboard/admin/bahan-baku"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const updateBahanBaku = (id, bahanbakuData, history) => dispatch => {
    axios
      .post(`/api/bahan-baku/update/${id}`, bahanbakuData)
      .then(res => history.push("/dashboard/admin/bahan-baku"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const deleteBahanBaku = id => dispatch => {
    axios
      .delete(`/api/bahan-baku/delete/${id}`)
      .then(res =>
        dispatch({
          type: GET_BAHANBAKU,
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
  export const setBahanBakuLoading = () => {
    return {
      type: BAHANBAKU_LOADING
    };
  };
  
  export const clearCurrentBahanBaku = () => {
    return {
      type: CLEAR_CURRENT_BAHANBAKU
    };
  };