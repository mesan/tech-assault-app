import io from 'socket.io-client';
import getUserToken from './util/getUserToken';
import Events from '../constants/Events';
import React from 'react';

import App from './modules/app/App';
import Home from './modules/home/Home';
import Login from './modules/login/Login';
import Highscore from './modules/highscore/Highscore';
import Match from './modules/match/Match';
import Enlist from './modules/enlist/Enlist';
import Splash from './modules/splash/Splash';
import Loot from './modules/loot/Loot';

require('babel/polyfill');
require('./modules/app/app.less');

const modules = {
    home: Home,
    login: Login,
    highscore: Highscore,
    match: Match,
    enlist: Enlist,
    splash: Splash,
    loot: Loot
};

const socket = io();

React.render(<App socket={socket} modules={modules} userToken={getUserToken()} />, document.getElementById('app'));

socket.on(Events.userUnauthorized, (arg) => {
    console.log(arg);
});
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