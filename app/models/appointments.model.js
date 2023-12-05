var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Counter Schema
const counterSchema = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 },
});
const Counter = mongoose.model('counter', counterSchema);

// Appointment Schema
var appointmentSchema = new Schema(
    {
        //id_appointment was removed because it was not in use

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
        //physician_specialty field is not needed due to we are referring in the physician_email to the objectID,with the _id of the physician is possible to get the specialty

    },
    {
        timestamps: true
    },
    { collection: "appointments" }
);

module.exports = mongoose.model("appointments", appointmentSchema);
