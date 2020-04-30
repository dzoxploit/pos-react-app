const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GudangSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,
        ref: "admin"
    },
    location_gudang_code:{
        type: String,
        min: 5,
        required: true
    },
    location_gudang_name:{
        type: String,
        required: true,
        max:100      
    },
    location_gudang_description:{
        type: String,
        required: true,
        max:100      
    },
    category_gudang: {
        type: Schema.Types.ObjectId,
        ref: "category_gudang"
    },
    status_gudang: {
        type: Boolean,
        required: false
    },
   date: {
       type: Date,
       default: Date.now
   } 
});

modul.exports = Gudang = mongoose.model("gudang", GudangSchema);