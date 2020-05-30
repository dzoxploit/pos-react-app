const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateKaryawanLoginInput(data) {
  let errors = {};

  data.karyawan_email = !isEmpty(data.karyawan_email) ? data.karyawan_email : "";
  data.karyawan_password = !isEmpty(data.karyawan_password) ? data.karyawan_password : "";

  if (!Validator.isEmail(data.karyawan_email)) {
    errors.karyawan_email = "Email is invalid";
  }
  if (Validator.isEmpty(data.karyawan_password)) {
    errors.karyawan_password = "Password field is required";
  }
  if (Validator.isEmpty(data.karyawan_email)) {
    errors.karyawan_email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
