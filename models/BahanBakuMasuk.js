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
    detail_bahan_baku_bagus: [
      {
        detail_bahan_baku_bagus_code:{
          type: String,
          max:100,
          required: true
        },
        bahan_baku_code: {
          type: String,
          max: 100,
        },
        bahan_baku_name: {
            type: String,
            max: 100,
            required: true
        },
        jumlah_bahan_baku:{
            type: Number,
            min:1,
            required: true
        },
        type_satuan: {
            type: Schema.Types.ObjectId,
            ref: "type_satuan"
        },
        status: {
          type: Boolean,
          required: true,
          default: true 
        },
        created_at: {
          type: Date,
          default: Date.now
        },
        updated_at: {
          type: Date,
          default: Date.now
        }
      }
  ],      

    distributor:{
        type: Schema.Types.ObjectId,
        ref: "distributor" 
    },
    status_bahan_baku_masuk: {
        type: Boolean,
        required: false
    },
   date: {
       type: Date,
       default: Date.now
   } 
});

modul.exports = BahanBakuMasuk = mongoose.model("bahan_baku_masuk", BahanBakuMasukSchema);