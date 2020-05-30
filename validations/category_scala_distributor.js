const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCategoryScalaDistributorInput(data) {
    let errors = {};

    data.category_gudang_code = !isEmpty(data.category_gudang_code) ? data.category_gudang_code : "";
    data.category_gudang_name = !isEmpty(data.category_gudang_name) ? data.category_gudang_name : "";
    data.status_category_gudang = !isEmpty(data.status_category_gudang) ? data.status_category_gudang : "";
   
    if (Validator.isEmpty(data.category_gudang_code)) {
        errors.category_gudang_code = "Category gudang code field is required";
    }
    if (Validator.isEmpty(data.category_gudang_name)) {
        errors.category_gudang_name = "Category gudang name field is required";
    }
      if (Validator.isEmpty(data.status_category_gudang)) {
        errors.status_category_gudang = "Status category gudang field is required";
      }
      return {
        errors,
        isValid: isEmpty(errors)
      };
}