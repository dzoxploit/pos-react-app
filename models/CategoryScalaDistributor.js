const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryScalaDistributorSchema = new Schema({
category_scala_distributor_code: {
    type: String,
    max:255,
    required: true
  },
  category_scala_distributor_name: {
    type: String,
    max:255,
    required: true
  }, 
  status: {
    type: Boolean,
  },
  date: {     
   type: Date,
  default: Date.now()
  }

});
module.exports = CategoryScalaDistributor = mongoose.model("category_scala_distributor", CategoryScalaDistributorSchema);