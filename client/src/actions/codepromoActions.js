import axios from "axios";

import {
    GET_CODEPROMO,
    GET_CODEPROMO,
    CLEAR_CURRENT_CODEPROMO,
    CODEPROMO_LOADING,
    GET_ERRORS,
    DELETE_CODEPROMO,
} from "./types";

export const getCurrentCodePromo = () => dispatch => {
    dispatch(setCodePromoLoading());
    axios
        .get("api/code-promo")
        .then(res =>
            dispatch({
                type: GET_CODEPROMO,
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
export const getCodePromoBySlug = code_promo_slug => dispatch => {
    dispatch(setCodePromoLoading());
    axios
        .get(`api/code-promo/${code_promo_slug}`)
        .then(res => 
            dispatch({
                type: GET_CODEPROMO,
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
export const getCodePromoById = id => dispatch => {
    dispatch(setCodePromoLoading());
    axios
        .get(`api/code-promo/edit/${id}`)
        .then(res => 
            dispatch({
                type: GET_CODEPROMO,
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
export const TestableValidationCodePromo = (code_promo, validationCodePromoData, history) => dispatch => {
    axios
      .post(`/api/validation/code-promo?cdp=${code_promo}`, validationCodePromoData)
      .then(res => history.push("/dashboard/admin/code-promo/validation-test"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const updateCodePromo = (id, codepromoData, history) => dispatch => {
    axios
      .post(`/api/code-promo/update/${id}`, codepromoData)
      .then(res => history.push("/dashboard/admin/code-promo"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const createCodePromo = (codepromoData, history) => dispatch => {
    axios
      .post("/api/code-promo/create", codepromoData)
      .then(res => history.push("/dashboard/admin/code-promo"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const deleteCodePromo = id => dispatch => {
    axios
      .delete(`/api/code-promo/delete/${id}`)
      .then(res =>
        dispatch({
          type: GET_CODEPROMO,
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
  export const setCodePromoLoading = () => {
    return {
      type: CODEPROMO_LOADING
    };
  };
  
  export const clearCurrentCodePromo = () => {
    return {
      type: CLEAR_CURRENT_CODEPROMO
    };
  };