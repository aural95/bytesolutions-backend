var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var chatsSchema = new Schema(
    {
        id_appointment: { type: Schema.Types.ObjectId, ref: 'appointment' },
        user_email: { type: Schema.Types.ObjectId, ref: 'users' , required: true, },
        date: { type: Date, required: true, default: Date.now },
        text: { type: String, required: true, },
    },
    {
        timestamps: true
    },
    { collection: "chats" }
);

module.exports = mongoose.model("chats", chatsSchema);
