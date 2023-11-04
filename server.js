const express = require("express");
const connectDB = require("./config/db"); // Function to connect to our database
const routes = require("./app/routes/project.routes");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set('strictQuery', false); // Add this line here

//connect to database
connectDB();

//start server
const app = express();

app.use(cors({ origin: "http://localhost:4200" }));


app.listen(4000, function check(error) {
  if (error) {
    console.log("Server error");
  } else {
    console.log("Server Started");
  }
});

app.use(express.json());
app.use(routes);
