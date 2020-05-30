const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ValidationPaymentSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: "admin"
  },
  DataTransactionOfficialStoreOnline: {
    type: Schema.Types.ObjectId,
    ref: "detail_transaction_official_store_online"
  },
  payment_transaction_code: {
    type: String,
    required: true,
    max: 40
  },
  status_payment_transaction: {
    type: Boolean,
    required: true,
    max: 40
  },
  date: {
    type: Date,
    default: Date.now
  }
});

class ValidationPayment {
  
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
  
  ValidationPaymentSchema.loadClass(ValidationPayment);
  

module.exports = ValidationPayment = mongoose.model("validationpayment", ValidationPaymentSchema);
