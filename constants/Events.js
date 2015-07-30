import keyMirror from 'keymirror';

export default keyMirror({

    connection: null, // A client connects.

    disconnect: null, // A client disconnects.

    loginRequested: null, // The server requests the user token from a client.

    login: null, // The client sends his user token to the server.

    loginAccepted: null, // The server accepts user login and sends user info to the client.

    loginRefused: null, // The server refuses user login (token not found) and sends reason to the client.

    opponentEnlisted: null, // The player enlists for a match.

    opponentFound: null // The server informs the player that an opponent has been found.
});