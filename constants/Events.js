import keyMirror from 'keymirror';

export default keyMirror({

    connection: null, // A client connects.

    disconnect: null, // A client disconnects.

    loginRequested: null, // The server requests the user token from a client.

    login: null, // The client sends his user token to the server.

    loginAccepted: null, // The server accepts user login and sends user info to the client.

    loginRefused: null, // The server refuses user login (token not found) and sends reason to the client.

    userUnauthorized: null, // The server informs the client that he is not authorized to perform a given request.

    playerEnlisted: null, // The player enlists for a match.

    matchStarted: null, // The server informs the client that an opponent has been found and a match has been started.

    performTurn: null, // The client informs the server that the player performs his turn.

    turnPerformed: null // The server informs the clients that the acting player has performed his turn.
});