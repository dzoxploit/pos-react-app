const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateGudangInput (data) {
    let errors = {};
    data.location_gudang_code = !isEmpty(data.location_gudang_code) ? data.location_gudang_code : "";
    data.location_gudang_name = !isEmpty(data.location_gudang_name) ? data.location_gudang_name : "";
    data.category_gudang = !isEmpty(data.category_gudang) ? data.category_gudang : "";
    data.status_gudang = !isEmpty(data.status_gudang) ? data.status_gudang : "";
    if (!Validator.isLength(data.location_gudang_code, { min: 5})) {
      errors.location_gudang_code = "Gudang code needs min 5 characters";
    }
    if (!Validator.isLength(data.location_gudang_name, { max: 200 })) {
      errors.location_gudang_name = "location_gudang_name max 200 characters";
    }
    if (Validator.isEmpty(data.category_gudang)) {
        errors.category_gudang = "category gudang field is required";
    }
      if (Validator.isEmpty(data.status_gudang)) {
        errors.status_gudang = "Status gudang field is required";
      }
      
      return {
        errors,
        isValid: isEmpty(errors)
      };
}