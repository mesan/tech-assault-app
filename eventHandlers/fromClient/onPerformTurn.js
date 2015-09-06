import Events from '../../constants/Events';

import requestUserByToken from '../../util/requests/requestUserByToken';
import requestPostTurn from '../../util/requests/requestPostTurn';
import mapToMatchesPerUser from '../timed/mapToMatchesPerUser';
import startCountdown from '../timed/startCountdown';

import { onTurnTimeout, onCountdownDecremented } from '../timed';

export default function onPerformTurn(turn) {
    const { socket, server } = this;
    const { token } = socket;
    const { tokenSocketMap, matchMap, matchIntervalMap } = server;

    let user;

    requestUserByToken(token)
        .then(userByToken => {
            user = userByToken;
            return requestPostTurn(user.id, turn);
        })
        .then(match => {
            const { matchId, users, finished: matchFinished, cardsToLoot, nextTurn, cardsLooted } = match;

            const userIndex = users.map(user => user.id).indexOf(user.id);
            const opponentIndex = userIndex === 0 ? 1 : 0;

            const matchesPerUser = mapToMatchesPerUser(match);

            const emits = [];

            emits.push({ socket, userIndex });

            const userTokens = matchMap[matchId];
            const otherTokenIndex = userTokens.findIndex(userToken => userToken !== token);

            if (otherTokenIndex !== -1) {
                const otherToken = userTokens[otherTokenIndex];
                const opponentSocket = tokenSocketMap[otherToken];

                if (opponentSocket) {
                    emits.push({ socket: opponentSocket, userIndex: opponentIndex });
                }
            }

            for (let emit of emits) {
                if (emit.socket) {
                    emit.socket.emit(Events.turnPerformed, matchesPerUser[emit.userIndex]);
                }
            }

            if (matchIntervalMap[matchId]) {
                clearInterval(matchIntervalMap[matchId]);
            }

            if (matchFinished) {
                const eventType = cardsLooted && cardsLooted.length > 0
                    ? Events.lootPerformed
                    : Events.matchFinished;

                for (let emit of emits) {
                    if (emit.socket) {
                        emit.socket.emit(eventType, matchesPerUser[emit.userIndex]);
                    }
                }

                if ((typeof cardsToLoot !== 'undefined' && cardsToLoot.length === 0) ||
                    (typeof cardsLooted !== 'undefined' && cardsLooted.length > 0)) {
                    delete matchMap[matchId];
                }
            } else {
                let initialCountdown = 10;

                matchIntervalMap[matchId] = startCountdown({
                    initialCountdown,
                    countdownDecrementedCallback(secondsLeft) {
                        const sockets = userTokens.map(token => {
                            return tokenSocketMap[token];
                        });

                        onCountdownDecremented(sockets, secondsLeft);
                    },
                    turnTimeoutCallback(initialCountdown) {
                        clearInterval(matchIntervalMap[matchId]);

                        const sockets = userTokens.map(token => {
                            return tokenSocketMap[token];
                        });

                        onTurnTimeout(sockets, initialCountdown, nextTurn);
                    }
                });
            }

            return match;
        })
        .catch(err => console.error(err.stack));
}