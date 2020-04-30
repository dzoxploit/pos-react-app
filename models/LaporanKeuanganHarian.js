const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaporanKeuanganHarian = new Schema({
    laporan_keuangan_description: {
        type: String,
        max: 255,
        required:false
    },
    total_transaction_online: {
        type: Boolean,
        min: 4,
        required: false
    },
    total_transaction_offline: {
        type: Boolean,
        min: 4,
        required: false
    },
    total_transaction_bukalapak: {
        type: Boolean,
        min: 4,
        required: false
    },
    total_transaction_tokopedia: {
        type: Boolean,
        min: 4,
        required: false
    },
    total_semua_transaction: {
        type: Boolean,
        min: 4,
        required: false
    },
    date: {
      type: Date,
      default: Date.now  
    }
})