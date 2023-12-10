// Import the necessary modules from the mongoose library
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define the User Schema using the Schema constructor from mongoose
var userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    id_role: { type: Schema.Types.ObjectId, ref: 'roles' },
    fullname: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    healthcard: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    specialty: { 
      type: String, 
      required: false }, 
  }, 
  {
    timestamps: true,
    collection: "users"
  }
);


module.exports = mongoose.model("users", userSchema);
