const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResellerSchema = new Schema({
    reseller_code: {
      type: String,
      min:5,
      required: true  
    },
    reseller_name:{
        type:String,
        max:200,
        required:true
    },
    reseller_email:{
        type: String,
        max: 200,
        required: true
    },
    reseller_password: {
        type: String,
        required: true
    },
    reseller_phone_number:{
        type: String,
        max: 12.
        required: true
    },
    reseller_description: {
        type: String,
        max: 200,
        min: 5,
        required: true,
    },
    category_reseller: {
        type: Schema.Types.ObjectId,
        ref:"category_reseller"
    },
    reseller_expired: {
        type: Date,
        required: false
    },
    status:{
        type: Boolean,
        required: false
    },
    bukti_transfer_reseller:{
        type: Boolean,
        required: false,
    }
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    } 
})