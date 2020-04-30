const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCategoryDetailInput(data) {
    let errors = {};

    data.category_detail_code = !isEmpty(data.category_detail_code) ? data.category_detail_code : "";
    data.category_detail_name = !isEmpty(data.category_detail_name) ? data.category_detail_name : "";
    data.category_slug_detail = !isEmpty(data.category_slug_detail) ? data.category_slug_detail : "";
    data.path_icon_category_detail = !isEmpty(data. path_icon_category_detail) ? data.path_icon_category_detail : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    if (!Validator.isLength(data.category_detail_name, { min: 3, max: 100 })) {
      errors.category_detail_name = "Category detail name needs to be b/w 3-100 characters";
    }
    if (!Validator.isLength(data.category_slug_detail, { min: 5, max: 100 })) {
      errors.category_slug_detail = "Category slug detail needs to be b/w 5-100 characters";
    }
    if (!Validator.isLength(data.description, { max: 200 })) {
      errors.description = "Description barang max 200 characters";
    }
    if (Validator.isEmpty(data.category_detail_name)) {
        errors.category_detail_name = "Category Detail name field is required";
    }
      if (Validator.isEmpty(data.category_slug_detail)) {
        errors.category_slug_detail = "Slug category detail field is required";
      }
      if (description.isEmpty(data.description)) {
        errors.description = "Description field is required";
      }
      if (Validator.isEmpty(data.path_icon_category_detail)) {
        errors.path_icon_category_detail = "Path icon category detail file is required";
      }
      if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
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