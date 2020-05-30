const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// @ts-ignore
const CategoryDetailSchema = new Schema({
    category_detail_code: {
        type: String,
        max: 255,
        required: true
      },
      category_detail_name: {
        type: String,
        required: true
      },
      category_slug_detail: {
        type: String,
        max: 255,
        required: true
      },
      path_icon_category_detail: {
        type: Date,
        required: true
      },
      description: {
        type: String
      },
      status: {
        type: Boolean,
        default: false,
      },
      created_at: {
        type: Date,
        default: Date.now
      },
      updated_at: {
        type: Date,
        default: Date.now
      }
});
// @ts-ignore
module.exports = CategoryDetail = mongoose.model("category_detail", CategorySchema);