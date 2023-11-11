const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
    {
        name: {
            type:String
        },
        age:{
            type:Number
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String
        },
        role:{
            type:["patient","physician","staff","admin"],
            default: "patient"
        }
    },
    {
        timestamps:true,   //TODO adiciona las columnas de la fecha de createAt, updateAt
        versionKey:false
    }
)

module.exports = mongoose.model("users",userScheme);