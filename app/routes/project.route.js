// var express = require("express");
// const router = express.Router();

module.exports = (app) => {
  const users = require("../controllers/users.controller");
  app.get("/users", users.findAll);
  app.put("/users/:id", users.editOne);
  app.delete("/users/:id", users.deleteOne);
  app.get('/api/users/physicians/:specialty', users.findPhysiciansBySpecialty);
  
  //role route endpoints
  const roles = require("../controllers/roles.controller");
  app.get("/roles", roles.findAll);
  
  const chats = require("../controllers/chats.controller");
}

