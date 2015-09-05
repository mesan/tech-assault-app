import keyMirror from 'keymirror';

export default keyMirror({

    connection: null, // A client connects.

    disconnect: null, // A client disconnects.

    loginRequested: null, // The server requests the user token from a client.

    login: null, // The client sends his user token to the server.

    loginAccepted: null, // The server accepts user login and sends user info to the client.

    loginRefused: null, // The server refuses user login (token not found) and sends reason to the client.

    userUnauthorized: null, // The server informs the client that he is not authorized to perform a given request.

    enlist: null, // The player enlists for a match.

    matchStarted: null, // The server informs the client that an opponent has been found and a match has been started.

    performTurn: null,  // The client informs the server that the player has performed his turn.

    turnPerformed: null, // The server informs both clients that the player has performed his turn, and that it now is
                         // the other player's turn.

    matchFinished: null, // The server informs both clients that the match is finished, and that the winner may loot the
                         // loser's cards.

    loot: null, // The client informs the server that the winner has picked a card to loot.

    lootPerformed: null, // The server informs both clients that the card(s) have been looted.

    turnCountdown: null, // The server informs of the updated turn countdown.

    turnDurationLimitExceeded: null, // The server informs both clients that the turn duration limit has exceeded and
                                     // the match is over.

    lootDurationLimitExceeded: null // The server informs both clients that the loot duration limit has exceeded and
                                    // no cards will be looted.
});