const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BarangJualOnlineSchema = new Schema({
  admin:{
    type: Schema.Types.ObjectId,
    ref: "admin"
  },
  barang_code: {
    type: String,
    required : true,
    max: 100
  },
  clasification_size_jual_online: [
    {
      clasification_size_barang_code: {
        type: String,
        max:255,
        required: true
      },
      clasification_size_jual_online_stok: {
        type: Number,
        required: true
      },
      type_ukuran: {
        type: Schema.Types.ObjectId,
        ref: "type_ukuran"
      },
      status: {
        type: Boolean,
        required: false
      },
    }
  ],
  
  jumlah_barang_jual_online:{
    type: Number,
  },
  status_fixed_harga: {
    type:Boolean,
    required:true
  },
  harga_jual_online: {
    type: Number,
    max:10,
  },
  discount_barang: {
    type: Float32Array,
    required: true
  },
  harga_promo_online: {
    type: Number,
    max:10,
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

class BarangJualOnline {
  
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
  
  BarangJualOnlineSchema.loadClass(BarangJualOnline);
  

module.exports = BarangJualOnline = mongoose.model("barangjualonline", BarangJualOnineSchema);
