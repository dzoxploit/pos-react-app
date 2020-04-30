const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BahanBakuSchema = new Schema({
  admin:{
    type: Schema.Types.ObjectId,
    ref: "admin"
  },
  bahan_baku_code: {
    type: String,
    required : true,
    max: 100
  },
  nama_bahan_baku: {
    type: String,
    required: true,
    max: 40
  },
  description_bahan_baku: {
    type: String,
    max: 200,
    required: false
  },
 
 distributor: {
    type: Schema.Types.ObjectId,
    ref: "distributor"
  },
       
  satuan : {
    type: Schema.Types.ObjectId,
    ref: "satuan"
  },
  jumlah_bahan_baku:{
    type: Number,
  },
  jumlah_bahan_baku_rusak:{
    type: Number,
  },

  status_bahan_baku: {
    type:Boolean,
    required:true
  },
  harga_beli_bahan_baku_satuan: {
    type: Number,
    max:10,
  },
  biaya_bahan_baku_semua: {
    type: Number,
    max:10,
  },
  location_gudang: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

class BahanBaku {
  
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
  
  BahanBakuSchema.loadClass(BahanBaku);
  

module.exports = BahanBaku = mongoose.model("bahan_baku", BahanBakuSchema);
