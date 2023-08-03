⁄const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

let savedDrawingData = null;

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the saved drawing data to the connecting user if it exists
  if (savedDrawingData) {
    socket.emit('initialDraw', savedDrawingData);
  }
ss
  socket.on('draw', (data) => {
    savedDrawingData = data; // Save the received drawing data
    socket.broadcast.emit('draw', data); // Broadcast the drawing data to all other clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
