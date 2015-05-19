import socketIO from 'socket.io';

// Events
import token from './events/token';

function register(server, options, next) {
    var io = require('socket.io')(server.listener);

    io.on('connection', function (socket) {
        socket.emit('tokenRequest'); 

        socket.on('token', token);
    });

    next();
};

register.attributes = {
    name: 'socketApp'
};

export default register;