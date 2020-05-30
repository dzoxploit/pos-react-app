const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateResellerLoginInput(data) {
  let errors = {};

  data.reseller_email = !isEmpty(data.reseller_email) ? data.reseller_email : "";
  data.reseller_password = !isEmpty(data.reseller_password) ? data.reseller_password : "";

  if (!Validator.isEmail(data.reseller_email)) {
    errors.reseller_email = "Email is invalid";
  }
  if (Validator.isEmpty(data.reseller_password)) {
    errors.reseller_password = "Password field is required";
  }
  if (Validator.isEmpty(data.reseller_email)) {
    errors.reseller_email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
