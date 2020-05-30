const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BarangResellerSchema = new Schema({
    reseller: {
        type: Schema.Types.ObjectId,
        ref: "reseller"
    },
    barang_reseller_code: {
        type: String,
        min: 5,
        required: true
    },
    barang_reseller_list: [
        {
            barang: {
                type: Schema.Types.ObjectId,
                ref: "barang"               
            },
              jumlah_barang: {
                type: String,
                max: 100,
                required: true
              },
              harga_reseller: {
                type: Schema.Types.ObjectId,
                ref: "distributor"
              },
              created_at: {
                type: Date,
                default: Date.now
              },
              updated_at: {
                type: Date,
                default: Date.now
              },
        },
    ],
    },
    status_barang_reseller:{
      type: Schema.Types.ObjectId,
      ref: "status_barang_reseller"
    },
    date: {
        type: Date,
        default: Date.now
    }  
})