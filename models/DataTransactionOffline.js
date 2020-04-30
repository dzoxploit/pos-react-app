const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataTransactionOfficialStoreOfflineSchema = new Schema({
  membership: {
    type: Schema.Types.ObjectId,
    ref : "user",
    required: false
  },
  transaction_code: {
    type: String,
    required : true,
    max: 100
  },
  cashier: {
    type: Schema.Types.ObjectId,
    ref: "cashier"
  },
  detail_belanja: [
    {
      barang_jual_code: {
        type: String,
        max:255,
        required: true
      },
      jumlah: {
        type: String,
        max:255,
        required: true
      },
      harga_barang: {
        type: Number,
        required: true
      },
      discount: {
        type: Float32Array,
        max:255
      },
      total_belanja_barang: {
        type: Number,
        max:255
      },
    }
  ],
  total_belanjaan_sementara: {
    type: Number,
    max: 10,
    required: true
  },
  total_potongan_belanja:{
    type: Number,
  },
  total_belanja_final:{
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
  status_belanjaan: {
    type: Boolean,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

class DataTransaction {
  
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
  
  DataTransactionSchema.loadClass(DataTransaction);
  

module.exports = DataTransaction = mongoose.model("data_transaction", DataTransactionSchema);
