const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user" 
    },
    checkout_list_user: [
        {
            checkout_code_transaction: {
                type: String,
                max:255,  
            },
            barang_jual_code: {
              type: String,
              max: 100,
              required: true
            },
            jumlah_barang: {
              type: Schema.Types.ObjectId,
              ref: "distributor"
            },
            status_checkout: {
              type: Number,
              max: 1,
              required: true
            },
            created_at: {
              type: Date,
              default: Date.now()
            },
            updated_at: {
              type: Date,
              default: Date.now()
            },
        }
      ],
    status_checkout_user: {
      type: Boolean,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    updated_at: {
      type: Date,
      default: Date.now()
    }
});
module.exports = CheckoutBarangSchema = mongoose.model("checkout_barang", CheckoutBarangSchema);