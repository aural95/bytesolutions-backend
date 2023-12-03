// var express = require("express");
// const router = express.Router();

module.exports = (app) => {
  //user route endpoints
  const users = require("../controllers/users.controller");
  app.get("/users", users.findAll);
  app.put("/users/:id", users.editOne);
  app.delete("/users/:id", users.deleteOne);
  app.get('/api/users/physicians/:specialty', users.findPhysiciansBySpecialty);
  
  //role route endpoints
  const roles = require("../controllers/roles.controller");
  app.get("/roles", roles.findAll);
  
  const appointments = require("../controllers/appointments.controller");
  app.get("/appointments", appointments.findAll);
  app.post("/appointments/load", appointments.PhysicianLoadSchedule);
  app.put("/appointments/schedule/:id", appointments.PatientSchedule);
  app.put("/appointments/cancel/:id", appointments.PatientCancel);
  
  const chats = require("../controllers/chats.controller");
 
//module.exports = router;
}