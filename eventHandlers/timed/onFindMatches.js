import requestMatches from '../../util/requests/requestMatches';
import requestPostEnlistment from '../../util/requests/requestPostEnlistment';
import Events from '../../constants/Events';

import initializeMatch from './initializeMatch';
import mapToMatchesPerUser from './mapToMatchesPerUser';

import onTurnTimeout from './onTurnTimeout';
import onCountdownDecremented from './onCountdownDecremented';

/**
 * At intervals, the system checks for players that have enlisted themselves for matches. The system matches players
 * one-on-one. If a player is not connected when he/she is matched with another, the other player is immediately
 * re-enlisted.
 */
export default function onFindMatches() {
    const { matchMap, matchIntervalMap }  = this;

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


                initializeMatch(userToken1, userToken2)
                    .then((match) => {
                        matchMap[match.matchId] = [ userToken1, userToken2 ];
                        const [ match1, match2 ] = mapToMatchesPerUser(match);

                        socket1.emit(Events.matchStarted, match1);
                        socket2.emit(Events.matchStarted, match2);

                        let countdown = 30;

                        const sockets = [ socket1, socket2 ];

                        matchIntervalMap[match.matchId] = setInterval(() => {
                            countdown--;

                            onCountdownDecremented.call(this, countdown, sockets);

                            if (countdown === 0) {
                                onTurnTimeout.call(this, 30, sockets, match.nextTurn);
                                clearInterval(matchIntervalMap[match.matchId]);
                            }
                        }, 1000);
                    })
                    .catch(console.error.bind(console));
            }
        });
}