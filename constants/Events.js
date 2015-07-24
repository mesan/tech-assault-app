import keyMirror from 'keymirror';

export default keyMirror({

    connection: null, // A client connects.

    disconnect: null, // A client disconnects.

    tokenRequested: null, // The server requests the user token from a client.

    tokenSent: null, // The client sends his user token to the server.

    opponentEnlisted: null, // The player enlists for a match.

    opponentFound: null // The server informs the player that an opponent has been found.
});