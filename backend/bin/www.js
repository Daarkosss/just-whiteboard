var app = require('../app.js');
var debug = require('debug')('just-whiteboard:server');
var https = require('https');
var fs = require('fs');
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { Server } = require("socket.io");
const { updateObjectsByBoardId } = require("../controllers/objects.controller.js");

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var server = https.createServer(httpsOptions, app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinBoard', (boardId) => {
    socket.join(boardId);
    console.log(`User joined board: ${boardId}`);
  });

  socket.on('leaveBoard', (boardId) => {
    socket.leave(boardId);
    console.log(`User left board: ${boardId}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('canvas-change', async (data) => {
    const { boardId, objects } = data;
    await updateObjectsByBoardId(boardId, objects);
    console.log(`Canvas changed on board: ${boardId}`);
    socket.to(boardId).emit('canvas-change', data); // Emit to others in the room
  });

  socket.on('cursor-position', (data) => {
    const { boardId, position } = data;
    socket.to(boardId).emit('cursor-position', position); // Emit to others in the room
  });
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  console.log("Connected to database!");
  server.listen(port, () => {
    console.log("Server is running on port " + port);
  });
});

server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
