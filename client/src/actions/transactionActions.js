import axios from "axios";

import {
  GET_TRANSACTION,
  GET_TRANSACTIONS,
  CLEAR_CURRENT_TRANSACTIONS,
  TRANSACTION_LOADING,
  GET_ERRORS,
  DELETE_TRANSACTION,
  SET_CURRENT_TRANSACTION,
} from "./types";

export const getCurrentTransaction = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/transaction/current")
    .then(res =>
      dispatch({
        type: GET_TRANSACTION,
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

export const getTransactionByUserHistory = (id_user, transaction_code) => dispatch => {
  dispatch(setTransactionByUserHistoryLoading());
  axios
    .get(`/api/user/transaction/${transaction_code}`)
    .then(res =>
      dispatch({
        type: GET_TRANSACTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

export const createTransaction = (transactionData, history) => dispatch => {
  axios
    .post("/api/cashier/transaction/create", transactionData)
    .then(res => history.push("/dashboard/cashier/transaction"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const ScanBarangTransaction = barang_code => dispatch => {
  axios
    .get(`/api/user/transaction/${barang_code}`)
    .then(res => 
      dispatch({
        type: GET_BARANG,
        payload: res.data    
      })
    )
    .catch( err =>
      dispatch({
        type: GET_ERRORS_TRANSACTION_BARANG,
        payload: null
      }) 
    );
}
export const DetailTransactionSave = (detailtransactionbarangData, history) => dispatch => {
    axios
      .post("/api/cashier/transaction/detail-transaction", detailtransactionbarangData)
      .then(res => history.push("/dashboard/cashier"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const updateBerkurangStockBarang = (barang_code, barangData, history) => dispatch => {
    axios
      .post(`/api/cashier/barang/update_barang_stock?utf=${barang_code}`, barangData)
      .then(res => history.push("/dashboard/cashier"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

export const setTransactionLoading = () => {
  return {
    type: TRANSACTION_LOADING
  };
};

export const setDetailTransactionLoading = () => {
  return {
    type: DETAILTRANSACTION_LOADING
  };
};

export const clearCurrentTransaction = () => {
  return {
    type: CLEAR_CURRENT_TRANSACTION
  };
};

export const clearCurrentDetailTransaction = () => {
  return {
    type: CLEAR_CURRENT_DETAILTRANSACTION
  };
};
