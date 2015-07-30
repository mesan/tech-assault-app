import io from 'socket.io-client';
import getUserToken from './util/getUserToken';
import Events from '../constants/Events';

// Server events.
import eventHandlers from './eventHandlers';


(function () {

    const userToken = getUserToken();

    if (!userToken) {
        return;
    }

    const socket = io();

    socket.token = userToken;

    socket.on(Events.loginRequested, eventHandlers.loginRequestedEventHandler);
    socket.on(Events.loginAccepted, eventHandlers.loginAcceptedEventHandler);
    socket.on(Events.loginRefused, eventHandlers.loginRefusedEventHandler);
    socket.on(Events.opponentFound, eventHandlers.opponentFoundEventHandler);

    document.getElementById('enlist').addEventListener('click', function (event) {
        event.preventDefault();
        socket.emit(Events.opponentEnlisted);
    });
})();