const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.use(cors())
const port = process.env.PORT

app.use(express.urlencoded({ extended: false }));

require('./routes/index')(app)

io.on('connection', (socket) => {
  console.log('A new user connected');
});


server.listen(port, () => {
  console.log(`app in port ${port}`)
});

module.exports = io;