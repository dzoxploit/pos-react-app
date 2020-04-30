import axios from "axios";

import {
    GET_DISTRIBUTOR,
    GET_DISTRIBUTORS,
    CLEAR_CURRENT_DISTRIBUTOR,
    DISTRIBUTOR_LOADING,
    GET_ERRORS,
    DELETE_DISTRIBUTOR,
} from "./types";

export const getCurrentDistributor = () => dispatch => {
    dispatch(setDistributorLoading());
    axios
        .get("api/distributor")
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
export const getDistributorBySlug = distributor_slug => dispatch => {
    dispatch(setDistributorLoading());
    axios
        .get(`api/distributor/${distributor_slug}`)
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
export const getDistributorById = id => dispatch => {
    dispatch(setDistributorLoading());
    axios
        .get(`api/distributor/${id}`)
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

export const createDistributor = (distributorData, history) => dispatch => {
    axios
      .post("/api/distributor", distributorData)
      .then(res => history.push("/dashboard/admin"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const deleteDistributor = id => dispatch => {
    axios
      .delete(`/api/distributor/${id}`)
      .then(res =>
        dispatch({
          type: GET_DISTRIBUTOR,
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