// Import the necessary modules from the mongoose library
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define the Role Schema using the Schema constructor from mongoose
const roleSchema = new Schema({
  name: String
}, {
  timestamps: true
},);

module.exports = mongoose.model("roles", roleSchema);
