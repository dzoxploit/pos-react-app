import axios from "axios";

import {
    GET_CATEGORYRESELLER,
    GET_CATEGORYRESELLER,
    CLEAR_CURRENT_CATEGORYRESELLER,
    CATEGORYRESELLER_LOADING,
    GET_ERRORS,
    DELETE_CATEGORYRESELLER,
} from "./types";

export const getCurrentCategoryReseller = () => dispatch => {
    dispatch(setCategoryResellerLoading());
    axios
        .get("api/category-reseller")
        .then(res =>
            dispatch({
                type: GET_CATEGORYRESELLER,
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
export const getCategoryResellerByCategoryResellerCode = category_reseller => dispatch => {
    dispatch(setCategoryGudangLoading());
    axios
        .get(`api/category-gudang/edit/${category_reseller_code}`)
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

export const createCategoryGudang = (categorygudangData, history) => dispatch => {
    axios
      .post("/api/category-gudang/create", categorygudangData)
      .then(res => history.push("/dashboard/admin/category-gudang"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const updateCategoryGudang = (id, categorygudangData, history) => dispatch => {
    axios
      .post(`/api/category-gudang/update/${id}`, categorygudangData)
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