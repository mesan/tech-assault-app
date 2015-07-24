import io from 'socket.io-client';
import getUserToken from './util/getUserToken';
import Events from '../constants/Events';

// Server events.
import tokenRequestedEventHandler from './eventHandlers/tokenRequestedEventHandler';


(function () {

    const userToken = getUserToken();

    if (!userToken) {
        return;
    }

    const socket = io();

    socket.token = userToken;

    socket.on(Events.tokenRequested, tokenRequestedEventHandler);

    socket.on(Events.opponentFound, (game) => {
        console.log(game);
    });

    document.getElementById('enlist').addEventListener('click', function (event) {
        event.preventDefault();
        socket.emit(Events.opponentEnlisted);
    });
})();