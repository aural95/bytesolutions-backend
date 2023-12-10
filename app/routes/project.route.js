// Module defining user and role route endpoints for the application.
module.exports = (app) => {

  // Import the user controller to handle user-related route endpoints
  const users = require("../controllers/users.controller");

  // Define user-related route endpoints

  // Get all users
  app.get("/users", users.findAll);

  // Edit a user by ID
  app.put("/users/:id", users.editOne);

  // Delete a user by ID
  app.delete("/users/:id", users.deleteOne);

  // Get physicians by specialty
  app.get('/users/physicians/:specialty', users.findPhysiciansBySpecialty);



  // Import the role controller to handle role-related route endpoints
  const roles = require("../controllers/roles.controller");

  // Define role-related route endpoints
  // Get all roles
  app.get("/roles", roles.findAll);
}

