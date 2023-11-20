var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
}, {
  timestamps: true
},);

module.exports = mongoose.model("roles", roleSchema);
