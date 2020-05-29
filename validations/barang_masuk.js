const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBarangMasukInput (data) {
    let errors = {};

    data.barang_code = !isEmpty(data.barang_code) ? data.barang_code : "";
    data.nama_barang = !isEmpty(data.nama_barang) ? data.nama_barang : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.jumlah_barang_siap_jual = !isEmpty(data.jumlah_barang_siap_jual) ? data.jumlah_barang_siap_jual : "";
    data.harga_beli = !isEmpty(data.harga_beli) ? data.harga_beli : "";
    data.harga_jual = !isEmpty(data.harga_jual) ? data.harga_jual : "";
    data.harga_promo = !isEmpty(data.harga_promo) ? data.harga_promo : "";
    data.location_gudang = !isEmpty(data.location_gudang) ? data.location_gudang : "";
    data.status_barang = !isEmpty(data.status_barang) ? data.status_barang : "";
    data.tag_category = !isEmpty(data.tag_category) ? data.tag_category : "";
    if (!Validator.isLength(data.nama_barang, { min: 3, max: 100 })) {
      errors.handle = "Nama barang needs to be b/w 3-100 characters";
    }
    if (!Validator.isLength(data.description, { max: 200 })) {
      errors.handle = "description barang max 200 characters";
    }
    if (Validator.isEmpty(data.nama_barang)) {
        errors.nama_barang = "Nama barang field is required";
      }
      if (Validator.isEmpty(data.degree)) {
        errors.degree = "Degree field is required";
      }
      if (description.isEmpty(data.description)) {
        errors.description = "Description field is required";
      }
      if (Validator.isEmpty(data.harga_beli)) {
        errors.harga_beli = "Harga beli field is required";
      }
      if (Validator.isEmpty(data.harga_jual)) {
        errors.harga_jual = "Harga jual field is required";
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