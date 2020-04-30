const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SatuanSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,
        ref: "admin"
    },
    satuan_code: {
        type: String,
        max:10,
        required: true
    },
    satuan_name: {
        type: String,
        max:10,
        required: true
    },
    satuan_status: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = Satuan = mongoose.model("satuan", SatuanSchema);