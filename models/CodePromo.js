const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CodePromoSchema = new Schema({
    code_promo_code: {
        type: String,
        max:255,  
    },
    code_promo_description: {
      type: String,
      max: 100,
      required: true
    },
    code_promo_generate_slug: {
      type: String,
      max: 255,
      required: true
    },
    category_code_promo: {
        type: Schema.Types.ObjectId,
        ref: "category_code_promo"
    },
    status_code_promo: {
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
module.exports = CodePromo = mongoose.model("code_promo", CodePromoSchema);