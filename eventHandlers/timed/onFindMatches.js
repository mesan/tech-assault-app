import requestMatches from '../../util/requests/requestMatches';
import requestPostEnlistment from '../../util/requests/requestPostEnlistment';
import Events from '../../constants/Events';

import initializeMatch from './initializeMatch';
import mapToMatchesPerUser from './mapToMatchesPerUser';

import onTurnTimeout from './onTurnTimeout';
import onCountdownDecremented from './onCountdownDecremented';
import startCountdown from './startCountdown';

/**
 * At intervals, the system checks for players that have enlisted themselves for matches. The system matches players
 * one-on-one. If a player is not connected when he/she is matched with another, the other player is immediately
 * re-enlisted.
 */
export default function onFindMatches() {
    const { matchMap, tokenSocketMap, matchIntervalMap }  = this;

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
                        const userTokens = [ userToken1, userToken2 ];
                        matchMap[match.matchId] = userTokens;
                        const [ match1, match2 ] = mapToMatchesPerUser(match);

                        socket1.emit(Events.matchStarted, match1);
                        socket2.emit(Events.matchStarted, match2);

                        let initialCountdown = 30;

                        matchIntervalMap[match.matchId] = startCountdown({
                            initialCountdown,
                            countdownDecrementedCallback(secondsLeft) {
                                const sockets = userTokens.map(token => {
                                    return tokenSocketMap[token];
                                });

                                onCountdownDecremented(sockets, secondsLeft);
                            },
                            turnTimeoutCallback(initialCountdown) {
                                clearInterval(matchIntervalMap[match.matchId]);
                                delete matchIntervalMap[match.matchId];

                                const sockets = userTokens.map(token => {
                                    return tokenSocketMap[token];
                                });

                                onTurnTimeout(sockets, initialCountdown, match.nextTurn, matchIntervalMap);
                            }
                        });
                    })
                    .catch((err) => console.log(err.stack));
            }
        });
}