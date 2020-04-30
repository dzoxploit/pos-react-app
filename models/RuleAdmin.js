const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RuleAdminSchema = new Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: "admin"
      },  
    rule_code: {
        type: String,
        required: true
    },
    rule_name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
    });

module.exports = RuleAdmin = mongoose.model("rule_admin", RuleAdminSchema);
