const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const soba = require('soba-be');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.use(router);

io.on('connect', (socket) => {
    soba(io, socket, {logging: true});

    /** Add more socket.on listener handlers here*/
});

server.listen(process.env.PORT || 5000,() => console.log(`Server has started.`));