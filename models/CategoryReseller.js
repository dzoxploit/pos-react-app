const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryResellerSchema = new Schema({
    category_reseller_code: {
      type: String,
      min:5,
      required: true  
    },
    category_reseller_name:{
        type:String,
        max:200,
        required:true
    },
    category_reseller_description: {
        type: String,
        max: 200,
        min: 5,
        required: true,
    },
    status:{
        type: Boolean,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    } 
})