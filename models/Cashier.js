const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CashierSchema = new Schema({
  full_name_cashier: {
    type: String,
    max: 100,
    required: true
  },
  last_name_cashier: {
    type: String,
    max:100,
  },
  username: {
      type: String,
      max:100,
      required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
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
