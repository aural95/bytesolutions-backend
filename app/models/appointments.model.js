// Import the necessary modules from the mongoose library
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define the Appointmen Schema using the Schema constructor from mongoose
var appointmentSchema = new Schema(
    {
        date: {
            type: String,
            required: true,
        },
        start_time: {
            type: String,
            required: true,
        },
        end_time: {
            type: String,
            required: true,
        },
        is_booked: {
            type: Boolean,
            default: false,
        },
        is_available: {
            type: Boolean,
            default: false,
        },
        physician_email: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        patient_email: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: false,
        },
    },
    {
        timestamps: true
    },
    { collection: "appointments" }
);

module.exports = mongoose.model("appointments", appointmentSchema);
