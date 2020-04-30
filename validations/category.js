const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCategoryInput (data) {
    let errors = {};
    data.category_code = !isEmpty(data.category_code) ? data.category_code : "";
    data.category_name = !isEmpty(data.category_name) ? data.category_name : "";
    data.category_slug = !isEmpty(data.category_slug) ? data.category_slug : "";
    data.path_category_file = !isEmpty(data.path_category_file) ? data.path_category_file : "";
    data.status_category = !isEmpty(data.status_category) ? data.status_category : "";
    if (!Validator.isLength(data.category_code, { min: 5})) {
      errors.handle = "Category code needs min 5 characters";
    }
    if (!Validator.isLength(data.category_name, { max: 200 })) {
      errors.handle = "category_name max 200 characters";
    }
    if (Validator.isEmpty(data.category_name)) {
        errors.category_name = "category name field is required";
    }
      if (Validator.isEmpty(data.category_slug)) {
        errors.category_slug = "Category slug is required";
      }
      if (Validator.isEmpty(data.path_category_file)) {
        errors.path_category_file = "Category file field is required";
      }
      if (Validator.isEmpty(data.status_category)) {
        errors.status_category = "status category field is required";
      }
      if (Validator.isEmpty(data.from)) {
        errors.from = "From date is required";
      }
    
      return {
        errors,
        isValid: isEmpty(errors)
      };
}