const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBarangResellerInput (data) {
    let errors = {};

    data.reseller = !isEmpty(data.reseller) ? data.reseller : "";
    data.barang_reseller_code = !isEmpty(data.barang_reseller_code) ? data.barang_code : "";
    data.status_barang_reseller = !isEmpty(data.status_barang_reseller) ? data.status_barang_reseller : "";

    if (Validator.isEmpty(data.reseller)) {
        errors.reseller = "reseller field is required";
      }
      if (Validator.isEmpty(data.barang_reseller_code)) {
        errors.barang_reseller_code = "Degree field is required";
      }
      if (Validator.isEmpty(data.status_barang_reseller)) {
        errors.status_barang_reseller = "Description field is required";
      }
      if (Validator.isEmpty(data.from)) {
        errors.from = "From date is required";
      }
      if (Validator.isEmpty(data.from)) {
        errors.from = "From date is required";
      }
    
      return {
        errors,
        isValid: isEmpty(errors)
      };
}