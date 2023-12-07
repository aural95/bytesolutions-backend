module.exports = (app) =>{
    //user route endpoints
    const appointmentController  = require('../controllers/appointments.controller');
    app.get('/appointments/getAppointments', appointmentController.findAll);
    app.get('/appointments/getAppointmentsPatient/:patientId', appointmentController.findAllByPatient);
    app.get('/appointments/getAppointmentsByDoctor/:doctorId', appointmentController.findAllByDoctor);
    app.get('/appointments/getAllAvailabilityByDoctor/:doctorId/:date', appointmentController.findAllAvailabilityByDoctor);
    app.get('/appointments/getAppointment/:appointmentId', appointmentController.findOneById);
    app.post('/appointments/createAppointment', appointmentController.createAppointment);
    app.post('/appointments/saveMessage', appointmentController.saveMessage);
    app.get('/appointments/getAllMessages/:appointmentId', appointmentController.findAllMessages);
}