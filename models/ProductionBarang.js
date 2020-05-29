// @ts-nocheck
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductionBarangSchema = new Schema({
  production_barang_code: {
    type: String,
    required : true,
    max: 100
  },
  barang:{
    type: Schema.Types.ObjectId,
    ref: "barang"
  },
  description_production_barang: {
    type: String,
    max:200,
    required: true
   },
  clasification_production_barang: [
    {
      clasification_production_barang_code: {
        type: String,
        max:255,
        required: true
      },
      clasification_size_barang: {
        type: Schema.Types.ObjectId,
        ref: "clasification_size_barang"
      },
      clasication_production_barang_description: {
        type: String,
        max:255
      },
      clasification_production_barang_stock: {
        type: Number,
        max: 20,
        required:true
      },
      type_ukuran:{
        type: Schema.Types.ObjectId,
        ref: "type_ukuran"
      }
    }
  ],
  jumlah_barang_production:{
    type: Number,
    required: true
  },
  jumlah_barang_production_sukses:{
    type: Number,
    required: true
  },
  jumlah_barang_production_gagal:{
    type: Number,
    required: true
  },
  location_gudang: {
    type: String
  },
  status_production_barang: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = ProductionBarang = mongoose.model("production_barang", ProductionBarangSchema);
