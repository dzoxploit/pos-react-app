const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataTransactionOfficialStoreOnlineSchema = new Schema({
  user: {
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
  checkout_transaction: [
    {
      checkout: {
        type: Schema.Types.ObjectId,
        ref: "checkout_barang" 
      },
      total_harga: {
        type: String,
        max:255,
        required: true
      },
      validation_pembayaran:{
        type: Schema.Types.ObjectId,
      }
    }
  ],
  code_promo: {
    type: String,
    max: 255
  },
  total_pembayaran:{
    type: String,
    max: 255,
  },
  status_pembayaran:{
    type: Boolean,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

class DataTransactionOfficialStoreOnline {
  
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
  
  DataTransactionOfficialStoreOnlineSchema.loadClass(DataTransactionOfficialStoreOnline);
  

module.exports = DataTransactionOfficialStoreOnline = mongoose.model("DataTransactionOfficialStoreOnline", DataTransactionOfficialStoreOnlineSchema);
