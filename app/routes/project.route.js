// var express = require("express");
// const router = express.Router();

module.exports = (app) =>{

    //user route endpoints
    const users = require('../controllers/users.controller');
    app.get('/users', users.findAll);

    //role route endpoints
    const roles = require('../controllers/roles.controller');
    app.get('/roles', roles.findAll);

    const appointments = require('../controllers/appointments.controller');
    const chats = require('../controllers/chats.controller');
}

//module.exports = router;
