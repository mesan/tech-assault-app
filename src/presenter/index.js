import io from 'socket.io-client';
import Events from '../constants/Events';
import React from 'react';

import PresenterApp from './modules/presenter-app/PresenterApp';

import PresenterHome from './modules/presenter-home/PresenterHome';
import PresenterSplash from './modules/presenter-splash/PresenterSplash';
import PresenterScreens from './modules/presenter-screens/PresenterScreens';

require('babel/polyfill');
require('./modules/presenter-app/presenter-app.less');

const modules = {
    presenterHome: PresenterHome,
    presenterSplash: PresenterSplash,
    presenterScreens: PresenterScreens
};

const socket = io();

React.render(<PresenterApp socket={socket} modules={modules} />, document.getElementById('app'));

/*socket.on(Events.userUnauthorized, (arg) => {
    console.log(arg);
});*/
// Server events.
//import eventHandlers from './eventHandlers';

(function () {

    /*const userToken = getUserToken();

    if (!userToken) {
        return; // render login skjerm
    }
    
    // Render riktig side fra socketen.

    const socket = io();

    socket.token = userToken;

    socket.on(Events.loginRequested, eventHandlers.onLoginRequested);
    socket.on(Events.loginAccepted, eventHandlers.onLoginAccepted);
    socket.on(Events.loginRefused, eventHandlers.onLoginRefused);
    socket.on(Events.userUnauthorized, eventHandlers.onUserUnauthorized);
    socket.on(Events.matchStarted, eventHandlers.onMatchStarted);
    socket.on(Events.turnPerformed, eventHandlers.onTurnPerformed);

    document.getElementById('enlist').addEventListener('click', function (event) {
        event.preventDefault();
        socket.emit(Events.playerEnlisted);
    });

    document.getElementById('perform').addEventListener('click', function (event) {
        event.preventDefault();
        socket.emit(
            Events.performTurn,
            {
                actionType: 'cardPlaced',
                cardId: document.getElementById('cardid').value,
                cardPosition: parseInt(document.getElementById('cardpos').value)
            });
    });
        socket.emit(Events.opponentEnlisted);
    });*/
})();