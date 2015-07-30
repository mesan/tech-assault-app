import getQuery from './util/urlQuery';
import io from 'socket.io-client';
import tokenRequest from './events/tokenRequest';

(function () {
    if(typeof(Storage) === 'undefined') {
        window.alert('Please use a browser that supports local storage.');
    }

    let token = getQuery('token');

    if (token) {
        window.localStorage.setItem('token', token);
    }

    let storedToken = window.localStorage.getItem('token');

    if (!storedToken) {
        return;
    }

    var socket = io();

    socket.token = storedToken;

    socket.on('tokenRequest', tokenRequest);

})();