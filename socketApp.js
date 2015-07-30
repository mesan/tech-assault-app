import socketIO from 'socket.io';

import Events from './constants/Events';

// Client events
import {
    loginEventHandler,
    enlistOpponentEventHandler,
    disconnectEventHandler
} from './events/fromClient';

// Timed events.
import findMatchesEventHandler from './events/timed/findMatchesEventHandler';

let tokenSocketMap = {};

function register(server, options, next) {
    server.tokenSocketMap = tokenSocketMap;

    var io = socketIO(server.listener);

    io.on(Events.connection, (socket) => {

        const requestContext = { server, socket };

        socket.emit(Events.loginRequested);

        socket.on(Events.login, loginEventHandler.bind(requestContext));
        socket.on(Events.opponentEnlisted, enlistOpponentEventHandler.bind(requestContext));
        socket.on(Events.disconnect, disconnectEventHandler.bind(requestContext));
    });

    setInterval(findMatchesEventHandler.bind(server), 5000);

    next();
};

register.attributes = {
    name: 'socketApp'
};

export default register;