import requestMatches from '../../util/requests/requestMatches';
import requestPostEnlistment from '../../util/requests/requestPostEnlistment';
import Events from '../../constants/Events';

/**
 * At intervals, the system checks for players that have enlisted themselves for matches. The system matches players
 * one-on-one. If a player is not connected when he/she is matched with another, the other player is immediately
 * re-enlisted.
 */
export default function findMatchesEventHandler() {
    requestMatches()
        .then((matches) => {
            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];

                const [userToken1, userToken2] = match;

                const [socket1, socket2] = match.map(userToken => this.tokenSocketMap[userToken]);

                if (typeof socket1 === 'undefined') {
                    console.error(`Could not find socket with token ${userToken1}`);

                    if (typeof socket2 !== 'undefined') {
                        requestPostEnlistment(socket2.token);
                    }

                    continue;
                }

                if (typeof socket2 === 'undefined') {
                    console.error(`Could not find socket with token ${userToken2}`);

                    requestPostEnlistment(socket1.token);

                    continue;
                }

                // TODO: Initialize match (generate game board, fetch players' primary decks, etc).

                socket1.emit(Events.opponentFound);
                socket2.emit(Events.opponentFound);
            }
        });
}