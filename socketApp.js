import socketIO from 'socket.io';

import Events from './constants/Events';

// Client events
import tokenEventHandler from './clientEventHandlers/tokenEventHandler';
import enlistOpponentEventHandler from './clientEventHandlers/enlistOpponentEventHandler';
import disconnectEventHandler from './clientEventHandlers/disconnectEventHandler';

// Timed events.
import findMatchesEventHandler from './timedEventHandlers/findMatchesEventHandler';

let tokenSocketMap = {};

function register(server, options, next) {
    server.tokenSocketMap = tokenSocketMap;

    var io = socketIO(server.listener);

    io.on(Events.connection, (socket) => {

        const requestContext = { server, socket };

        socket.emit(Events.tokenRequested);

        socket.on(Events.tokenSent, tokenEventHandler.bind(requestContext));
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