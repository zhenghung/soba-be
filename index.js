const {
    SOCKET_ON_JOIN_ROOM,
    SOCKET_ON_SOCKETID,
    SOCKET_ON_BROADCAST_GAMESTATE,
    SOCKET_ON_LEAVE_ROOM,
    SOCKET_ON_REJECT_PLAYER,
    SOCKET_EMIT_SOCKETID,
    SOCKET_EMIT_PLAYER_JOINED_FAILED,
    SOCKET_EMIT_PLAYER_JOINED,
    SOCKET_EMIT_UPDATE_GAMESTATE,
    SOCKET_EMIT_PLAYER_REJECTED
} = require('./resources/properties');

function SetupSobaListeners(socket, config) {

    /** Client requesting a SocketId,
     * sent back to client */
    socket.on(SOCKET_ON_SOCKETID, ({}, callback) => {
        if (config.logging) console.log(`Fetch SocketId ${socket.id}`);
        socket.emit(SOCKET_EMIT_SOCKETID, {socketId: socket.id});
        callback();
    });

    /** Client requesting to join a room,
     * sends to everyone in the room */
    socket.on(SOCKET_ON_JOIN_ROOM,
        ({isHost, playerName, socketId, roomCode}, callback) => {
            if (config.logging) console.log('JOINING ROOM: ', {playerName, socketId, roomCode});
            socket.join(roomCode);
            socket.emit(SOCKET_EMIT_SOCKETID, {socketId: socket.id});
            if (!isHost && io.sockets.adapter.rooms[roomCode].length < 2) {
                if (config.logging) console.log("Invalid RoomCode");
                socket.leave(roomCode);
                socket.emit(SOCKET_EMIT_PLAYER_JOINED_FAILED, {playerName, message: "Invalid Room"});
            } else {
                if (config.logging) console.log(`Player ${playerName} Joined`);
                io.in(roomCode).emit(SOCKET_EMIT_PLAYER_JOINED, {isHost, playerName, socketId: socket.id});
            }
            callback();
        });

    /** Host rejects player joining,
     * Sends to everyone in the room but only acted upon by target player */
    socket.on(SOCKET_ON_REJECT_PLAYER, ({roomCode, playerName}, callback) => {
        if (config.logging) console.log(`Player ${playerName} Rejected`);
        socket.to(roomCode).emit(SOCKET_EMIT_PLAYER_REJECTED, {roomCode, playerName});
        callback();
    });

    /** Rejected player leaves room */
    socket.on(SOCKET_ON_LEAVE_ROOM, (roomCode, callback) => {
        socket.leave(roomCode);
        callback();
    });

    /** Client broadcasting their gameState,
     * sends to everyone else in the same room */
    socket.on(SOCKET_ON_BROADCAST_GAMESTATE, (gameState, callback) => {
        if (gameState.hasOwnProperty('roomCode')) {
            if (config.logging) {
                console.log('BROADCASTING GAME STATE: ', gameState.roomCode);
                console.log(gameState);
            }
            socket.to(gameState.roomCode).emit(SOCKET_EMIT_UPDATE_GAMESTATE, gameState);
        }
        callback();
    });
}

module.exports = SetupSobaListeners;