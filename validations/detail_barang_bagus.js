const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDetailBarangMasukBagusInput(data) {
    let errors = {};

    data.detail_barang_bagus_code = !isEmpty(data.detail_barang_bagus) ? data.detail_barang_code : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    if (!Validator.isLength(data.detail_barang_bagus_code, { min: 3, max: 100 })) {
      errors.detail_barang_bagus_code = "Detail barang bagus code needs to be b/w 3-100 characters";
    }
    if (Validator.isEmpty(data.detail_barang_bagus_code)) {
        errors.detail_barang_bagus_code = "Detail barang bagus code field is required";
    }
    if (Validator.isEmpty(data.detail_barang_bagus_code)) {
      errors.detail_barang_bagus_code = "Detail barang bagus code field is required";
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