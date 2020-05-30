const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBarangResellerListInput(data) {
  let errors = {};

  data.barang = !isEmpty(data.barang) ? data.barang : "";
  data.jumlah_barang = !isEmpty(data.jumlah_barang) ? data.jumlah_barang : "";
  data.harga_reseller = !isEmpty(data.harga_reseller) ? data.harga_reseller : "";
  data

  if (Validator.isEmpty(data.barang)) {
    errors.barang = "Barang field is required";
  }
  if (Validator.isEmpty(data.jumlah_barang)) {
    errors.jumlah_barang = "Jumlah barang field is required";
  }
  if (Validator.isEmpty(data.harga_reseller)) {
    errors.harga_reseller = "Harga reseller is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};
