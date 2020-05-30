const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KaryawanSchema = new Schema({
  first_name_karyawan: {
    type: String,
    max: 100,
    required: true
  },
  last_name_karyawan: {
    type: String,
    max:100,
  },
  alamat_karyawan: {
      type: String,
      max:255,
      required: true
  },
  phone_number: {
      type: String,
      max:255,
    required:true
  },
  karyawan_username: {
      type: String,
      max:100,
      required: true
  },
  karyawan_email: {
    type: String,
    required: true
  },
  karyawan_password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Admin = mongoose.model("admin", AdminSchema);
