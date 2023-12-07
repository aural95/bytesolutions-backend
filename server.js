require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db"); // Function to connect to our database
const cors = require("cors");
const app = express();
const http = require('http').Server(app);
const mongoose = require("mongoose");
const Chats = require('./app/models/chats.model')

mongoose.set('strictQuery', false); // Add this line here

//connect to database
connectDB();

//start server
//const app = express();

const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// Handle socket connections
io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);
  var users = []; // Array to store connected users

  socket.on('send-nickname', (userName) => {
    socket.nickname = userName;
    users.push(socket.nickname);
    console.log(users);
  });

  socket.on('joinChatRoom', (roomId) => {
    if (!roomId) {
      console.error("roomId is missing!");
      return;
    }
    socket.join(roomId);
    console.log("Joined Well" + roomId);
  });


  socket.on('leaveChatRoom', (roomId) => {
    if (!roomId) {
      console.error("roomId is missing!");
      return;
    }

    // Leave the specified chat room
    socket.leave(roomId);
    console.log("Left room: " + roomId);
  });

  // When a user sends a message
  socket.on('sendMessage', async ({ roomId, sender, message }) => {
    if (!roomId) {
      console.error("roomId is missing!");
      return;
    }
    const newChatMessage = new Chats({ id_appointment: new mongoose.Types.ObjectId(roomId), user_email:sender, text: message });
    //await newChatMessage.save();
    io.to(roomId).emit('newMessage', newChatMessage);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    "message": "It is working!!"
  })
})

require('./app/routes/project.route')(app)
require('./app/routes/appointment.route')(app)
app.use(require("./app/routes/auth.route"));

app.listen(4000, function check(error) {
  if (error) {
    console.log("Server error");
  } else {
    console.log('Server Started and listening in port 4000');
  }
});


const PORT = 4765;
http.listen(PORT, () => {
  console.log(`Server with Socket.io is running on http://localhost:${PORT}`);
});



