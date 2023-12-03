const Appointments = require('../models/appointments.model')
const Chat = require('../models/chats.model')
const mongoose = require('mongoose');

exports.findAll = (req, res) => {
    Appointments.find()
        .populate('physician_email', 'fullname specialty')
        .sort({ date: 'desc' })
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
exports.findAllByPatient = (req, res) => {
    const patientId = req.params.patientId; // 
    Appointments.find({ patient_email: new mongoose.Types.ObjectId(patientId), is_booked: true })
        .populate('physician_email', 'fullname specialty')
        .populate({ path: 'patient_email', select: 'fullname' })
        .sort({ date: 'desc' })
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
exports.findAllByDoctor = (req, res) => {
    const doctorId = req.params.doctorId; // Assuming the patient ID is in the request parameters
    console.log(doctorId);
    Appointments.find({ physician_email: new mongoose.Types.ObjectId(doctorId), is_booked: true })
        //.populate({path: 'physician_email',select: 'fullname'})
        .populate('physician_email', 'fullname specialty')
        .populate({ path: 'patient_email', select: 'fullname' })
        .sort({ date: 'desc' })
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


exports.createAppointment = async (req, res) => {

    // router.post("/", async (req, res) => {
    //     try {
    //       const newAppointment = new Appointment({
    //         // populate the fields based on req.body
    //       });

    //       const savedAppointment = await newAppointment.save();

    //       res.status(201).json(savedAppointment);
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).json({ error: "Internal Server Error" });
    //     }
    //   });


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
    //res.redirect('/');
};