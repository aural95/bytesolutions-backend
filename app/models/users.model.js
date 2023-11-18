var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
      type: String,
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
  }, 
  {
    timestamps: true,
    collection: "users"
  }
);


module.exports = mongoose.model("users", userSchema);
