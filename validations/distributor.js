const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCategoryInput (data) {
    let errors = {};
    data.distributor_code = !isEmpty(data.distributor_code) ? data.distributor_code : "";
    data.distributor_name = !isEmpty(data.distributor_name) ? data.distributor_name : "";
    data.distributor_description = !isEmpty(data.distributor_description) ? data.distributor_description : "";
    data.category_scala_distributor = !isEmpty(data.category_scala_distributor) ? data.category_scala_distributor : "";
    data.distributor_no_npwp = !isEmpty(data.distributor_no_npwp) ? data.distributor_no_npwp : "";
    data.distributor_address = !isEmpty(data.distributor_address) ? data.distributor_address : "";
    data.distributor_phone_number = !isEmpty(data.distributor_phone_number) ? data.distributor_phone_number : "";
    data.distributor_coordinate_location = !isEmpty(data.distributor_coordinate_location) ? data.distributor_coordinate_location : "";
    data.distributor_surat_mou = !isEmpty(data.distributor_surat_mou) ? data.distributor_surat_mou : "";
    data.status_expired_distributor = !isEmpty(data.status_expired_distributor) ? data.status_expired_distributor : "";
    data.status_distributor = !isEmpty(data.status_distributor) ? data.status_distributor : "";
    if (!Validator.isLength(data.distributor_code, { min: 5})) {
      errors.distributor_code = "Distributor code needs min 5 characters";
    }
    if (!Validator.isLength(data.distributor_name, { max: 200 })) {
      errors.distributor_name = "distributor_name max 200 characters";
    }
    if (!Validator.isLength(data.distributor_description, { max: 200 })) {
      errors.distributor_description = "distributor_description max 200 characters";
    }
    if (Validator.isEmpty(data.category_scala_distributor_code)) {
        errors.category_scala_distributor_code = "category scala distributor field is required";
    }
      if (Validator.isEmpty(data.distributor_no_npwp)) {
        errors.distributor_no_npwp = "No npwp is required";
      }
      if (Validator.isEmpty(data.distributor_phone_number)) {
        errors.distributor_phone_number = "Phone Number field is required";
      }
      if (Validator.isEmpty(data.distributor_address)) {
        errors.distributor_address = "Distributor Address field is required";
      }
      if (Validator.isEmpty(data.distributor_coordinate_location)) {
        errors.distributor_coordinate_location = "Location distributor field is required";
      }
      if (Validator.isEmpty(data.distributor_surat_mou)) {
        errors.distributor_surat_mou = "Distributor surat mou field is required";
      }
      if (Validator.isEmpty(data.status_category)) {
        errors.status_category = "status category field is required";
      }
      if (Validator.isEmpty(data.from)) {
        errors.from = "From date is required";
      }
      if(data.status_expired_distributor == 1){
        if(Validator.isEmpty(data.distributor_date_expired)){
          errors.distributor_date_expired = "Distributor date expired is required";
        }
      }

      return {
        errors,
        isValid: isEmpty(errors)
      };
}