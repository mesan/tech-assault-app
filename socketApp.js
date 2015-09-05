import socketIO from 'socket.io';

import Events from './constants/Events';

// Timed events and events from client.
import eventHandlers from './eventHandlers';

let tokenSocketMap = {};

let matchMap = {};

function register(server, options, next) {
    server.tokenSocketMap = tokenSocketMap;
    server.matchMap = matchMap;

    var io = socketIO(server.listener);

    io.on(Events.connection, (socket) => {

        const requestContext = { server, socket };

        socket.emit(Events.loginRequested);

        socket.on(Events.login, eventHandlers.fromClient.onLogin.bind(requestContext));
        socket.on(Events.enlist, eventHandlers.fromClient.onEnlist.bind(requestContext));
        socket.on(Events.disconnect, eventHandlers.fromClient.onDisconnect.bind(requestContext));
        socket.on(Events.performTurn, eventHandlers.fromClient.onPerformTurn.bind(requestContext));
        socket.on(Events.loot, eventHandlers.fromClient.onLoot.bind(requestContext));
    });

    setInterval(eventHandlers.timed.onFindMatches.bind(server), 5000);

    next();
};

register.attributes = {
    name: 'socketApp'
};

export default register;