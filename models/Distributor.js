const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DistributorSchema = new Schema({
    distributor_code: {
        type: String,
        max:255,
        required: true  
    },
    distributor_name: {
      type: Strings,
      max: 100,
      required: true
    },
    distributor_description: {
      type: String,
      max: 255,
      required: true
    },
    category_scala_distributor_code: 
    {
      type: Schema.Types.ObjectId,
      ref: "category_scala_distributor"
    },
    distributor_no_npwp: {
      type: Number,
      max:40,
    },
    distributor_address: {
      type: String,
      required: true
    },
    distributor_phone_number: {
      type: String,
      max:12,
      required: true
    },
    distributor_coordinate_location: {
      type:String,
      max:50
    },
    distributor_surat_mou: {
      type: String,
      required: true
    },
    status_expired_distributor: {
      type: Boolean,
      required: true
    },
    distributor_date_expired: {
      type:Date,
      max:50,
      required: true
    },
    status_distributor: {
      type: Boolean,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    updated_at: {
      type: Date,
      default: Date.now()
    }
});
module.exports = Distributor = mongoose.model("distributor", DistributorSchema);