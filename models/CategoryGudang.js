const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryGudangSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,
        ref: "admin"
    },
    category_gudang_code:{
        type: String,
        min: 5,
        required: true
    },
    category_gudang_name:{
        type: String,
        required: true,
        max:100      
    },
    status_category_gudang: {
        type: Boolean,
        required: false
    },
   date: {
       type: Date,
       default: Date.now
   } 
});

modul.exports = CategoryGudang = mongoose.model("category_gudang", CategoryGudangSchema);