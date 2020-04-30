const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDetailBarangMasuCacatkInput(data) {
    let errors = {};

    data.detail_barang_cacat_code = !isEmpty(data.detail_barang_cacat_code) ? data.detail_barang_cacat_code : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    if (!Validator.isLength(data.detail_barang_cacat_code, { min: 3, max: 100 })) {
      errors.detail_barang_cacat_code = "Detail barang bagus code needs to be b/w 3-100 characters";
    }
    if (Validator.isEmpty(data.detail_barang_cacat_code)) {
        errors.detail_barang_cacat_code = "Detail barang bagus code field is required";
    }
    if (Validator.isEmpty(data.status)) {
      errors.status = "Status barang cacatfield is required";
    }
    if (Validator.isEmpty(data.created_at)) {
      errors.created_at = "From date is required";
    }
    if (Validator.isEmpty(data.updated_at)) {
      errors.updated_at = "From date is required";
    }
    
      return {
        errors,
        isValid: isEmpty(errors)
      };
}