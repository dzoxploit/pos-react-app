const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BarangJualOfflineSchema = new Schema({
  admin:{
    type: Schema.Types.ObjectId,
    ref: "admin"
  },
  barang_code: {
    type: String,
    required : true,
    max: 100
  },
  clasification_size_jual: [
    {
      clasification_size_barang_code: {
        type: String,
        max:255,
        required: true
      },
      clasification_size_jual_stok: {
        type: Number,
        required: true
      },
      type_ukuran: {
        type: Schema.Types.ObjectId,
        ref: "type_ukuran"
      },
      clasification_size_barang_description: {
        type: String,
        max:255
      },
    }
  ],
  
  jumlah_barang_jual_offline:{
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
  discount_barang: {
    type: Float32Array,
    required: true
  },
  harga_promo: {
    type: Number,
    max:10,
  },
  batas_harga_promo: {
    type: Number,
    max: 10,
    required: true
  },
  status_barang: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

class BarangJualOffline {
  
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
  
  BarangJualOfflineSchema.loadClass(BarangJualOffline);
  

module.exports = BarangJualOffline = mongoose.model("barangjualoffline", BarangJualOfflineSchema);
