var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: String
}, {
  timestamps: true
},);

module.exports = mongoose.model("roles", roleSchema);
