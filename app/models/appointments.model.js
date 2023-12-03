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
        id_appointment: { type: Number, required: true, unique: true, default: -1 },
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
            type: String,
            required: true,
        },
        patient_email: {
            type: String,
            required: true,
        },
        physician_specialty: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    },
    { collection: "appointments" }
);

// Middleware to auto-increment id_appointment
appointmentSchema.pre('save', function (next) {
    const doc = this;
    Counter.findByIdAndUpdate(
        { _id: 'id_appointment' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    )
        .then(counter => {
            doc.id_appointment = counter.sequence_value;
            next();
        })
        .catch(error => {
            next(error);
        });
});




module.exports = mongoose.model("appointments", appointmentSchema);
