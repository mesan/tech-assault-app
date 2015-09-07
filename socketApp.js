import socketIO from 'socket.io';

import Events from './constants/Events';

// Timed events and events from client.
import eventHandlers from './eventHandlers';

// Map of user tokens pointing to their respective socket.
let tokenSocketMap = {};

// Map of match IDs pointing to an array of the user tokens.
let matchMap = {};

// Map of match IDs pointing to turn intervals.
const matchIntervalMap = {};

function register(server, options, next) {
    server.tokenSocketMap = tokenSocketMap;
    server.matchMap = matchMap;
    server.matchIntervalMap = matchIntervalMap;

    var io = socketIO(server.listener);

    io.on(Events.connection, (socket) => {

        const requestContext = { server, socket };

        socket.emit(Events.loginRequested);

        socket.on(Events.login, eventHandlers.fromClient.onLogin.bind(requestContext));
        socket.on(Events.requestDeck, eventHandlers.fromClient.onRequestDeck.bind(requestContext));
        socket.on(Events.updatePrimaryDeck, eventHandlers.fromClient.onUpdatePrimaryDeck.bind(requestContext));
        socket.on(Events.enlist, eventHandlers.fromClient.onEnlist.bind(requestContext));
        socket.on(Events.disconnect, eventHandlers.fromClient.onDisconnect.bind(requestContext));
        socket.on(Events.performTurn, eventHandlers.fromClient.onPerformTurn.bind(requestContext));
        socket.on(Events.loot, eventHandlers.fromClient.onLoot.bind(requestContext));
        socket.on(Events.highscores, eventHandlers.fromClient.onHighscores.bind(requestContext));
    });

    setInterval(eventHandlers.timed.onFindMatches.bind(server), 5000);

    next();
};

register.attributes = {
    name: 'socketApp'
};

export default register;