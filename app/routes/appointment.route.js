module.exports = (app) =>{
     // Import the appointment controller to handle route endpoints
     const appointmentController = require('../controllers/appointments.controller');

     // Define appointment-related route endpoints
 
     // Get all appointments
     app.get('/appointments/getAppointments', appointmentController.findAll);
 
     // Get appointments for a specific patient
     app.get('/appointments/getAppointmentsPatient/:patientId', appointmentController.findAllByPatient);
 
     // Get appointments for a specific doctor
     app.get('/appointments/getAppointmentsByDoctor/:doctorId', appointmentController.findAllByDoctor);
 
     // Get all available appointments for a specific doctor on a given date
     app.get('/appointments/getAllAvailabilityByDoctor/:doctorId/:date', appointmentController.findAllAvailabilityByDoctor);
 
     // Get details of a specific appointment by ID
     app.get('/appointments/getAppointment/:appointmentId', appointmentController.findOneById);
 
     // Get all messages for a specific appointment
     app.get('/appointments/getAllMessages/:appointmentId', appointmentController.findAllMessages);
 
     // Alias route for getting all appointments (duplicate route)
     app.get("/appointments", appointmentController.findAll);
 
     // Schedule an appointment by updating its status to booked
     app.put("/appointments/schedule/:id", appointmentController.patientSchedule);
 
     // Cancel a scheduled appointment
     app.put("/appointments/cancel/:id", appointmentController.patientCancel);
 
     // Load a physician's schedule by creating available appointments
     app.post("/appointments/load", appointmentController.physicianLoadSchedule);
 
     // Create a new appointment
     app.post('/appointments/createAppointment', appointmentController.createAppointment);
 
     // Save a chat message for a specific appointment
     app.post('/appointments/saveMessage', appointmentController.saveMessage);
    
}
