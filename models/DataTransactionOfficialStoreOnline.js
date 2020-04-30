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
  detail_barang: [
    {
      clasification_size_barang_code: {
        type: String,
        max:255,
        required: true
      },
      clasification_size_barang_name: {
        type: String,
        max:255,
        required: true
      },
      clasification_size_barang_stok: {
        type: Number,
        required: true
      },
      clasification_size_barang_description: {
        type: String,
        max:255
      },
      type_ukuran: [
        {
          type_ukuran_code:{
            type: String,
            max: 255,
            required:true
          },
          type_ukuran_name: {
            type:String,
            max:100,
            required:true
          },
          status_type_ukuran: {
            type:Boolean,
            required:true
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
    }
  ],
  barang_masuk: [
    {
        barang_masuk_code: {
            type: String,
            max:255,  
        },
        barang_code: {
          type: String,
          max: 100,
          required: true
        },
        detail_barang_bagus: [
          {
            detail_barang_bagus_code:{
              type: String,
              max:100,
              required: true
            },
            barang_code: {
              type: String,
              max: 100,
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
        detail_barang_cacat: [
          {
          detail_barang_cacat_code:{
            type: String,
            max:100,
            required: true
          },
          barang_code: {
            type: String,
            max: 100,
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
        distributor: {
          type: Schema.Types.ObjectId,
          ref: "distributor"
        },
        count_barang_masuk: {
          type: Boolean,
          required: true
        },
        status_barang_masuk: {
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
        },
    }
  ],
  barang_keluar_refurbish: [
    {
    barang_keluar_code: {
        type: String,
        max: 255,
        required: true
      },
      barang_code: {
        type: String,
        max: 100,
        required: true
      },
      distributor_pengepul: {
        type: Schema.Types.ObjectId,
        ref: "distributor"
      },
      count_barang_keluar_refurbish:{
        type:Boolean,
        required: true
      },
      created_at: {
        type: Date,
        default: Date.now
      },
      updated_at: {
        type: Date,
        default: Date.now
      }
    },
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
