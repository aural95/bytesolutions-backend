// Import necessary modules and models
const Appointments = require('../models/appointments.model')
const Users = require('../models/users.model')
const Chat = require('../models/chats.model')
const mongoose = require('mongoose');

// Constants for defining appointment hours
const START_TIME_HOUR = 9;
const END_TIME_HOUR = 17;

// Controller method to find all appointments
exports.findAll = (req, res) => {
    Appointments.find()
        .populate('physician_email', 'fullname specialty')
        .sort({ date: 'desc', start_time: 'asc' })
        .then(apmnt => {
            res.send(apmnt)
        }
        ).catch(err => {
            res.status(500).send({
                'message': 'Something went wrong!!',
                'error': err
            })
        })
}

// Controller method to find all available appointments by doctor and date
exports.findAllAvailabilityByDoctor = (req, res) => {
    const doctorId = req.params.doctorId;
    const date = req.params.date;
    Appointments.find({ physician_email: new mongoose.Types.ObjectId(doctorId), date: date, is_booked: false })
        .populate('physician_email', 'fullname specialty')
        .populate({ path: 'patient_email', select: 'fullname' })
        .sort({ date: 'desc', start_time: 'asc' })
        .then(apmnt => {
            if (!apmnt || apmnt.length === 0) {
                return res.status(503).send({
                    success: false,
                    message: 'Appointments not found for the specified doctor.'
                });
            }
            res.send({
                success: true,
                message: 'Appointments retrieved successfully.',
                data: apmnt,
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: 'Something went wrong!!',
                error: err
            });
        });
}

// Controller method to schedule an appointment for a patient
exports.patientSchedule = async (req, res) => {
    const { patient_email } = req.body;
    console.log(patient_email);

    const appointmentToEdit = await Appointments.findById(req.params.id);
    //Search if the appointment exists
    if (!appointmentToEdit) {
        return res.status(404).send("Appointment not found...");
    }
    //Search if the appointment id match between the current object and the appointment to update
    if (appointmentToEdit._id.toString() !== req.params.id) {
        return res.status(401).send("Appointment update failed. Not authorized...");
    }
    const patientRequestAppointment = await Users.findById(patient_email);
    console.log(patientRequestAppointment);
    //Search if the patient exists

    if (!patientRequestAppointment)
        return res.status(404).send("Patient requesting appointment does not exist...");

    //Search if the user id match between the current object and the patient to update
    if (patientRequestAppointment._id.toString() !== patient_email)
        return res.status(401).send("Appointment update failed. Not authorized...");


    try {
        const updatedAppointment = await Appointments.findByIdAndUpdate(
            req.params.id,
            { is_booked: true, patient_email: patientRequestAppointment._id },
            { new: true }
        );

        res.send(updatedAppointment);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Controller method to cancel a patient's appointment
exports.patientCancel = async (req, res) => {
    const appointmentToEdit = await Appointments.findById(req.params.id);
    //Search if the user exists
    if (!appointmentToEdit) {
        return res.status(404).send("Appointment not found...");
    }
    //Search if the user id match between the current object and the user to update
    if (appointmentToEdit._id.toString() !== req.params.id)
        return res.status(401).send("Appointment update failed. Not authorized...");


    try {
        const updatedAppointment = await Appointments.findByIdAndUpdate(
            req.params.id,
            { is_booked: false, patient_email: null },
            { new: true }
        );
        res.send({
            success: true,
            message: 'Appointment cancelled',
            data: updatedAppointment,
        });


    } catch (err) {
        res.status(500).send(err.message);
    }

}

// Controller method to load a physician's schedule for a specific date
exports.physicianLoadSchedule = async (req, res) => {
    const { physician_email, date } = req.body;

    let appointmentList = [];
    let currentAppointmentData;
    let resultFlag = false;
    for (let i = START_TIME_HOUR; i < END_TIME_HOUR; i++) {
        for (let j = 0; j <= 1; j++) {
            currentAppointmentData = new Appointments();
            currentAppointmentData.physician_email = physician_email;
            currentAppointmentData.date = date;
            currentAppointmentData.start_time =
                (i < 10 ? "0" + i : i) + ":" + (j == 0 ? "00" : "30");
            var end = i + j;
            currentAppointmentData.end_time =
                (end < 10 ? "0" + end : end) + ":" + (j == 1 ? "00" : "30");
            currentAppointmentData.is_Booked = false;
            appointmentList.push(currentAppointmentData);
        }
    }
    console.log(appointmentList);
    if (resultFlag) {
        res.status(500).send({
            status: false,
            message: "Error creating appointments",
        });
    } else {
        try {

            await Appointments.insertMany(appointmentList).then(result => {
                console.log(result);
                res.send({
                    status: true,
                    message: result
                });
            });

        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

// Controller method to find an appointment by ID
exports.findOneById = (req, res) => {
    const appointmentId = req.params.appointmentId; // 
    Appointments.find({ _id: appointmentId, is_booked: true })
        .populate('physician_email', 'fullname specialty')
        .populate({ path: 'patient_email', select: 'fullname' })
        .then(apmnt => {
            if (!apmnt || apmnt.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'Appointment not found'
                });
            }
            res.send({
                success: true,
                message: 'Appointment retrieved successfully.',
                data: apmnt,
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: 'Something went wrong!!',
                error: err
            });
        });
}

// Controller method to find all appointments for a specific patient
exports.findAllByPatient = (req, res) => {
    const patientId = req.params.patientId; // 
    Appointments.find({ patient_email: new mongoose.Types.ObjectId(patientId), is_booked: true })
        .populate('physician_email', 'fullname specialty')
        .populate({ path: 'patient_email', select: 'fullname' })
        .sort({ date: 'desc', start_time: 'asc' })
        .then(apmnt => {
            if (!apmnt || apmnt.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'Appointments not found for the specified patient.'
                });
            }
            res.send({
                success: true,
                message: 'Appointments retrieved successfully.',
                data: apmnt,
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: 'Something went wrong!!',
                error: err
            });
        });
}

// Controller method to find all appointments for a specific patient
exports.findAllByDoctor = (req, res) => {
    // Assuming the patient ID is in the request parameters
    const doctorId = req.params.doctorId;
    console.log(doctorId);
    Appointments.find({ physician_email: new mongoose.Types.ObjectId(doctorId), is_booked: true })
        .populate('physician_email', 'fullname specialty')
        .populate({ path: 'patient_email', select: 'fullname' })
        .sort({ date: 'desc', start_time: 'asc' })
        .then(apmnt => {
            if (!apmnt || apmnt.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'Appointments not found for the specified doctor.'
                });
            }
            res.send({
                success: true,
                message: 'Appointments retrieved successfully.',
                data: apmnt,
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: 'Something went wrong!!',
                error: err
            });
        });
}

// Controller method to save a chat message for an appointment
exports.saveMessage = async (req, res) => {
    const newMessage = new Chat({
        id_appointment: new mongoose.Types.ObjectId(req.body.id_appointment),
        user_email: new mongoose.Types.ObjectId(req.body.user_email),
        text: req.body.text,
    });
    console.log(newMessage);
    newMessage.save()
        .then(apmnt => {
            if (!apmnt || apmnt.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'Message not inserted.'
                });
            }
            res.send({
                success: true,
                message: 'Message inserted',
                data: apmnt,
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: 'Something went wrong!!',
                error: err
            });
        });
}

// Controller method to find all messages for a specific appointment
exports.findAllMessages = (req, res) => {
    const appointmentId = req.params.appointmentId; // 
    Chat.find({ id_appointment: new mongoose.Types.ObjectId(appointmentId) })
        .then(apmnt => {
            if (!apmnt) {
                return res.status(404).send({
                    success: false,
                    message: 'Appointments not found for the specified patient.'
                });
            }
            res.send({
                success: true,
                message: 'Appointments retrieved successfully.',
                data: apmnt,
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: 'Something went wrong!!',
                error: err
            });
        });
}

// Controller method to create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        // Create a new appointment instance based on the request body
        const newAppointment = new Appointments({
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            physician_email: req.body.physician_email,
            patient_email: req.body.patient_email,
        });

        // Save the appointment to the database
        const savedAppointment = await newAppointment.save();

        // Send a success response
        res.status(201).json(savedAppointment);
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};