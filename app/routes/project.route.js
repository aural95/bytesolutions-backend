// var express = require("express");
// const router = express.Router();

module.exports = (app) =>{

    const users = require('../controllers/users.controller');
    app.get('/users', users.findAll);
    app.get('/api/users/physicians/:specialty', users.findPhysiciansBySpecialty);

    const roles = require('../controllers/roles.controller');
    const appointments = require('../controllers/appointments.controller');


    const chats = require('../controllers/chats.controller');
}

//module.exports = router;

    //app.post('/api/appointments', appointments.saveappointment); - linea 12