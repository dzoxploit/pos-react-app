
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryCodePromoSchema = new Schema({
    category_code_promo_name: {
      type: String,
      max: 100,
      required: true
    },
    status_category_code_promo: {
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
module.exports = CategoryCodePromo = mongoose.model("category_code_promo", CategoryCodePromo);