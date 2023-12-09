module.exports = (app) =>{
    //user route endpoints
    const appointmentController  = require('../controllers/appointments.controller');
    app.get('/appointments/getAppointments', appointmentController.findAll);
    app.get('/appointments/getAppointmentsPatient/:patientId', appointmentController.findAllByPatient);
    app.get('/appointments/getAppointmentsByDoctor/:doctorId', appointmentController.findAllByDoctor);
    app.get('/appointments/getAllAvailabilityByDoctor/:doctorId/:date', appointmentController.findAllAvailabilityByDoctor);
    app.get('/appointments/getAppointment/:appointmentId', appointmentController.findOneById);
    app.get('/appointments/getAllMessages/:appointmentId', appointmentController.findAllMessages);
    app.get("/appointments", appointmentController.findAll);
    app.put("/appointments/schedule/:id", appointmentController.PatientSchedule);
    app.put("/appointments/cancel/:id", appointmentController.PatientCancel);
    app.post("/appointments/load", appointmentController.PhysicianLoadSchedule);
    app.post('/appointments/createAppointment', appointmentController.createAppointment);
    app.post('/appointments/saveMessage', appointmentController.saveMessage);
    
}
