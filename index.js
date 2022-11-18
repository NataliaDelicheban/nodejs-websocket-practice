const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const messageRoute = require('./routes/messages');

const app = express();
const socket = require('socket.io');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/message', messageRoute);
mongoose.connect(process.env.DB_HOST, () => console.log('DB is connect'));

const server = app.listen(process.env.PORT, () => console.log("Server is running on PORT"));

const io = socket(server, {
    cors: { origin: "http://localhost:3000", credentials: true }
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('addUser', (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on('sendMessage', (data) => {
        // const sendUserSocket = onlineUsers.get(data.to)
        // if (sendUserSocket) {
        socket.broadcast.emit('Message sent', data);
        console.log(data);
        // }
    });
});
