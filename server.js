
/**
 * Main server file for an application using Express, MongoDB, and Socket.io.
 * @module server
 */


// Load environment variables from a .env file
require("dotenv").config();

// Import required modules and libraries
const express = require("express");
const connectDB = require("./config/db"); // Function to connect to our database
const cors = require("cors");
const app = express();
const http = require('http').Server(app);
const mongoose = require("mongoose");
const Chats = require('./app/models/chats.model')

// Allow MongoDB queries with relaxed schema validation
mongoose.set('strictQuery', false); 

//Connect to database
connectDB();

// Create a Socket.io server and 
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});
//configure CORS
app.use(cors());

// Handle socket connections
io.on('connection', (socket) => {
  var users = []; // Array to store connected users

   // Event: When a user sends their nickname
  socket.on('send-nickname', (userName) => {
    socket.nickname = userName;
    users.push(socket.nickname);
  });

  // Event: When a user joins a chat room
  socket.on('joinChatRoom', (roomId) => {
    if (!roomId) {
      console.error("roomId is missing!");
      return;
    }
    socket.join(roomId);
  });

// Event: When a user leaves a chat room
  socket.on('leaveChatRoom', (roomId) => {
    if (!roomId) {
      console.error("roomId is missing!");
      return;
    }

    // Leave the specified chat room
    socket.leave(roomId);
  });

 // Event: When a user sends a message
  socket.on('sendMessage', async ({ roomId, sender, message }) => {
    if (!roomId) {
      console.error("roomId is missing!");
      return;
    }
    const newChatMessage = new Chats({ id_appointment: new mongoose.Types.ObjectId(roomId), user_email:sender, text: message });
    io.to(roomId).emit('newMessage', newChatMessage);
  });

    // Event: When a user disconnects
  socket.on('disconnect', () => {
  });
});


app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.json({
    "message": "It is working!!"
  })
})

// Include routes for projects, appointments, and authenticatio
require('./app/routes/project.route')(app)
require('./app/routes/appointment.route')(app)
app.use(require("./app/routes/auth.route"));

// Start the Express server on port 4000
app.listen(4000, function check(error) {
  if (error) {
    console.log("Server error");
  } else {
    console.log('Server Started and listening in port 4000');
  }
});

// Start the Socket.io server on port 4765
const PORT = 4765;
http.listen(PORT, () => {
  console.log(`Server with Socket.io is running on http://localhost:${PORT}`);
});

