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
  description: {
    type: String,
    max: 255
  },
  jumlah_barang_siap_jual:{
    type: Number,
  },
  jumlah_barang_reject:{
    type: Number,
  },
  status_fixed_harga: {
    type:Boolean,
    required:true
  },
  harga_beli: {
    type: Number,
    max:10,
  },
  harga_jual: {
    type: Number,
    max:10,
  },
  harga_promo: {
    type: Number,
    max:10,
  },
  location_gudang: {
    type: String
  },
  status_barang: {
    type: String,
    required: true
  },
  tag_category: {
    type: [String],
    required: true
  },
  eficiency_bahan_baku_production: {
    type: Float32Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

class Barang {
  
      static getRec(date) {
          return this.find({
              recordedDate : {
                  '$lte' :new Date(date)
              }
          }).exec();
      }
  
      static insertBulkData(data){
          return this.insertMany(data);
      }
  
      static archiveData(date){
          
          return this.updateMany({
              recordedDate : {
                  '$lte' :new Date(date)
              }
          },{
              $set : {
                  isArchived : true
              }
          }).exec();
      }
  
      static getArchivedData(){
          return this.find({
              isArchived : true
          }).exec();
      }
  }
  
  Barangchema.loadClass(Barang);
  

module.exports = Barang = mongoose.model("barang", BarangSchema);
