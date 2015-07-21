import socketIO from 'socket.io';

// Events
import tokenEventHandler from './eventHandlers/tokenEventHandler';
import enlistOpponentEventHandler from './eventHandlers/enlistOpponentEventHandler';

function register(server, options, next) {
    var io = require('socket.io')(server.listener);

    io.on('connection', function (socket) {
        socket.emit('tokenRequest'); 

        socket.on('token', tokenEventHandler);

        socket.on('opponentEnlisted', enlistOpponentEventHandler);
    });

    next();
};

register.attributes = {
    name: 'socketApp'
};

export default register;