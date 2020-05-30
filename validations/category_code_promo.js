const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCategoryDetailInput(data) {
    let errors = {};

    data.category_code_promo_name = !isEmpty(data.category_detail_code) ? data.category_detail_code : "";
    data.status_category_code_promo = !isEmpty(data.status_category_code_promo) ? data.status_category_code_promo : "";
   
    if (Validator.isEmpty(data.category_code_promo_name)) {
        errors.category_code_promo_name = "Category code promo name field is required";
    }
      if (Validator.isEmpty(data.status_category_code_promo)) {
        errors.status_category_code_promo = "Status category code promo field is required";
      }
      return {
        errors,
        isValid: isEmpty(errors)
      };
}