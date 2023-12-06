require("dotenv").config(); 
const express = require("express");
const connectDB = require("./config/db"); // Function to connect to our database
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set('strictQuery', false); // Add this line here

//connect to database
connectDB();

//start server
const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json({
      "message": "It is working!!"
  })
})

require('./app/routes/project.route')(app)

app.listen(4000, function check(error) {
  if (error) {
    console.log("Server error");
  } else {
    console.log('Server Started and listening in port 4000');
  }
});



