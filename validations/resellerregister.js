const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateResellerRegisterInput (data) {
    let errors = {};
    data.reseller_code = !isEmpty(data.reseller_code) ? data.reseller_code : "";
    data.reseller_name = !isEmpty(data.reseller_name) ? data.reseller_name : "";
    data.reseller_email = !isEmpty(data.reseller_email) ? data.reseller_email : "";
    data.reseller_password = !isEmpty(data.reseller_password) ? data.reseller_password : "";
    data.reseller_password2 = !isEmpty(data.reseller_password2) ? data.reseller_password2 : "";
    data.reseller_phone_number = !isEmpty(data.reseller_phone_number) ? data.reseller_phone_number : "";

    if (!Validator.isLength(data.reseller_name, { min: 2, max: 50 })) {
      errors.name = "Name must be between 2 and 50 characters";
    }
  
    if (Validator.isEmpty(data.reseller_name)) {
      errors.name = "Reseller Name field is required";
    }
  
    if (Validator.isEmpty(data.reseller_email)) {
      errors.reseller_email = "Email field is required";
    }
    if (!Validator.isEmail(data.reseller_email)) {
      errors.reseller_email = "Email is invalid";
    }
    if (Validator.isEmpty(data.reseller_password)) {
      errors.reseller_password = "Password field is required";
    }
    if (!Validator.isLength(data.reseller_password, { min: 8, max: 30 })) {
      errors.reseller_password = "Password must be atleast 8 characters";
    }
    if (Validator.isEmpty(data.reseller_password2)) {
      errors.reseller_password2 = "Confirm password field is required";
    }
  
    if (!Validator.equals(data.reseller_password, data.reseller_password2)) {
      errors.reseller_password2 = "Passwords must be same";
    }

      return {
        errors,
        isValid: isEmpty(errors)
      };
}