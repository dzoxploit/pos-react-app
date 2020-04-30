const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_code: {
        type: String,
        max:255,  
    },
    category_name: {
      type: String,
      max: 100,
      required: true
    },
    category_slug: {
      type: String,
      max: 255,
      required: true
    },
    path_category_file: {
      type: Boolean,
      required: true
    },
    status_category: {
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
module.exports = Category = mongoose.model("category", CategorySchema);