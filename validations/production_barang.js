const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProductionBarangInput (data) {
    let errors = {};
    data.production_barang_code = !isEmpty(data.production_barang_code) ? data.production_barang_code : "";
    data.barang = !isEmpty(data.barang) ? data.barang : "";
    data.jumlah_barang_production = !isEmpty(data.jumlah_barang_production) ? data.jumlah_barang_production : "";
    data.jumlah_barang_production_sukses = !isEmpty(data.jumlah_barang_production_sukses) ? data.jumlah_barang_production_sukses : "";
    data.jumlah_barang_production_gagal = !isEmpty(data.jumlah_barang_production_gagal) ? data.jumlah_barang_production_gagal : "";
    data.location_gudang = !isEmpty(data.location_gudang) ? data.location_gudang : "";
    data.status_production_barang = !isEmpty(data.status_production_barang) ? data.status_production_barang: "";
    
    
    if (!Validator.isLength(data.production_barang_code, { min: 5})) {
      errors.production_barang_code = "Production barang needs min 5 characters";
    }
    if (!Validator.isLength(data.description_production_barang, { max: 200 })) {
      errors.description_production_barang = "description_production_barang max 200 characters";
    }
    if (Validator.isEmpty(data.barang)) {
        errors.barang = "barang field is required";
    }
      if (Validator.isEmpty(data.jumlah_barang_production)) {
        errors.jumlah_barang_production = "Jumlah barang production is required";
      }

      if (Validator.isEmpty(data.jumlah_barang_production_sukses)) {
        errors.jumlah_barang_production_sukses = "jumlah_barang_production_sukses field is required";
    }
    if (Validator.isEmpty(data.jumlah_barang_production_gagal)) {
        errors.jumlah_barang_production_gagal = "jumlah_barang_production_gagal field is required";
    }
      if (Validator.isEmpty(data.status_production_barang)) {
        errors.status_production_barang = "Status Production Barang field is required";
      }
      
      return {
        errors,
        isValid: isEmpty(errors)
      };
}